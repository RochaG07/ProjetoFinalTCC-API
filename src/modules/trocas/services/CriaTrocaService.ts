import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import Troca from '../infra/typeorm/entities/Troca';
import ICustomerProvider from '@modules/usuarios/providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import ISubscriptionProvider from '@modules/usuarios/providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';

interface IRequest {
    descricao: string,
    idUser: string,
    idJogoOfertado: string,
    idJogoDesejado: string,
    consoleJogoOfertado: string,
    consoleJogoDesejado: string,
}

@injectable()
class CriaTrocaService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
        @inject('TrocasJogosRepository')
        private trocasJogosRepository: ITrocasJogosRepository,
        @inject('JogosRepository')
        private jogosRepository: IJogosRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
    ){}

    public async executar({
        descricao,
        idUser, 
        idJogoOfertado, 
        idJogoDesejado,
        consoleJogoOfertado,
        consoleJogoDesejado,
    }:IRequest):Promise<Troca> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        //Verifica se os jogos são válidos
        const jogoOfertadoNoBD = await this.jogosRepository.acharPorId(idJogoOfertado);
        const jogoDesejadoNoBD = await this.jogosRepository.acharPorId(idJogoDesejado);

        if(!jogoOfertadoNoBD || !jogoDesejadoNoBD){
            throw new AppError("Jogo inexistente");
        }

        //validar o idCustomer pelo stripe toda vez que uma troca é 
        //criada por um usuário que tenha um idCustomer não nulo
        let premiumAtivo = false;
        if(usuario.idCustomer !== null){
            //TODO verificar se o customer possui um plano ativo através da API do stripe
            premiumAtivo = await this.subscriptionProvider.verificarSeAtiva(usuario.idCustomer);
        }

        if(!premiumAtivo){
            if(usuario.trocasDisponiveis <= 0){
                throw new AppError("Trocas disponiveis insuficientes");
            }

            //Somente consome as trocas disponíveis se usuário não premium
            usuario.trocasDisponiveis--;

            await this.usuariosRepository.salvar(usuario);
        }

        // Buscar a url da imagem de capa de ambos os jogo 
        // TODO deixar de salvar a url no banco e só expor ela na rota
        const urlDaCapaJogoOfertado = jogoOfertadoNoBD.getCapa_url();
        const urlDaCapaJogoDesejado = jogoDesejadoNoBD.getCapa_url();

        if(!urlDaCapaJogoOfertado || !urlDaCapaJogoDesejado){
            throw new AppError("Capa de jogo inexistente");
        }

        const troca = await this.trocasRepository.criar({
            descricao,
            idUser: usuario.id,
            nomeJogoOfertado: jogoOfertadoNoBD.nome,
            nomeJogoDesejado: jogoDesejadoNoBD.nome,
            urlDaCapaJogoOfertado,
            urlDaCapaJogoDesejado,
            nomeConsoleJogoOfertado: consoleJogoOfertado,
            nomeConsoleJogoDesejado: consoleJogoDesejado,
        });

        //Registra cada jogo presente em uma troca na tabela trocas_jogos
        await this.trocasJogosRepository.criar({
            troca,
            jogo: jogoOfertadoNoBD
        });
        await this.trocasJogosRepository.criar({
            troca,
            jogo: jogoDesejadoNoBD
        });

        return troca;    
    }
}

export default CriaTrocaService;
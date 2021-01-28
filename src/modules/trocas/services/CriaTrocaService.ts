import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import Troca from '../infra/typeorm/entities/Troca';

import AtualizaTrocasDisponiveisService from '@modules/usuarios/services/AtualizaTrocasDisponiveisService';

import { addWeeks } from 'date-fns';

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
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        //Verifica se os jogos são válidos
        const jogoOfertadoNoBD = await this.jogosRepository.acharPorId(idJogoOfertado);
        const jogoDesejadoNoBD = await this.jogosRepository.acharPorId(idJogoDesejado);

        if(!jogoOfertadoNoBD || !jogoDesejadoNoBD){
            throw new AppError("Jogo inexistente");
        }

        // Buscar a url da imagem de capa de ambos os jogo 
        // TODO deixar de salvar a url no banco e só expor ela na rota
        const urlDaCapaJogoOfertado = jogoOfertadoNoBD.getCapa_url();
        const urlDaCapaJogoDesejado = jogoDesejadoNoBD.getCapa_url();

        if(!urlDaCapaJogoOfertado || !urlDaCapaJogoDesejado){
            throw new AppError("Capa de jogo inexistente");
        }

        //TODO
        if(!/*premiumAtivo*/false){
            const atualizaTrocasDisponiveis = container.resolve(AtualizaTrocasDisponiveisService);

            let {trocasDisponiveis, proxTrocaDisp} = await atualizaTrocasDisponiveis.executar(usuario);

            if(trocasDisponiveis <= 0){
                throw new AppError("Trocas disponíveis insuficientes");
            }

            trocasDisponiveis--;

            //Começa uma nova contagem se ela não existir (usuario antes com 3/3 trocas)
            if(!proxTrocaDisp){
                const dataAtual = new Date(Date.now());

                proxTrocaDisp = addWeeks(dataAtual, 1);
            }

            usuario.trocasDisponiveis = trocasDisponiveis;
            usuario.proxTrocaDisp = proxTrocaDisp;

            this.usuariosRepository.salvar(usuario);
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
            estado: usuario.estado,
            municipio: usuario.municipio,
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
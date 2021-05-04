import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import Troca from '../infra/typeorm/entities/Troca';

import AtualizaTrocasDisponiveisService from '@modules/usuarios/services/AtualizaTrocasDisponiveisService';

import { addWeeks, isBefore } from 'date-fns';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IPremiumRepository from '@modules/usuarios/repositories/IPremiumRepository';

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
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
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
            throw new AppError("Usuário não existe", 404);
        }

        //Verifica se os jogos são válidos
        const jogoOfertadoNoBD = await this.jogosRepository.acharPorId(idJogoOfertado);
        const jogoDesejadoNoBD = await this.jogosRepository.acharPorId(idJogoDesejado);

        if(!jogoOfertadoNoBD || !jogoDesejadoNoBD){
            throw new AppError("Jogo inexistente", 404);
        }

        const capaJogoOfertado = jogoOfertadoNoBD.capa;
        const capaJogoDesejado = jogoDesejadoNoBD.capa;

        let deveCobrarTrocasDisponiveis = true;

        const premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(premium){
            if(premium.status === 'ativo'){
                deveCobrarTrocasDisponiveis = false;
            }
            else if(premium.status === 'cancelado' && premium.dataExpiracao){
                const dataAtual = new Date(Date.now());

                //Verifica se a data de expiração já expirou
                if(isBefore(dataAtual, premium.dataExpiracao)){
                    deveCobrarTrocasDisponiveis = false;
                }
            }
        }
        
        if(deveCobrarTrocasDisponiveis){
            const atualizaTrocasDisponiveis = container.resolve(AtualizaTrocasDisponiveisService);

            let {trocasDisponiveis, proxTrocaDisp} = await atualizaTrocasDisponiveis.executar(usuario);

            if(trocasDisponiveis <= 0){
                throw new AppError("Trocas disponíveis insuficientes", 401);
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
            capaJogoOfertado,
            capaJogoDesejado,
            nomeConsoleJogoOfertado: consoleJogoOfertado,
            nomeConsoleJogoDesejado: consoleJogoDesejado,
            estado: usuario.estado,
            municipio: usuario.municipio,
            username: usuario.username
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
        
        this.cacheProvider.invalidatePrefix(`trocas-disponiveis`);

        this.cacheProvider.invalidate(`minhas-trocas:${usuario.id}`);

        return troca;    
    }
}

export default CriaTrocaService;
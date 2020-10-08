import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import Troca from '../infra/typeorm/entities/Troca';

interface IRequest {
    descricao: string,
    idUser: string,
    jogoDoTrocador: string,
    jogoDesejado: string,
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

    public async executar({descricao, idUser, jogoDoTrocador, jogoDesejado}:IRequest):Promise<Troca> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        //TODO futuramente limitar a quantidade de trocas ativas por usuário

        //Verifica se os jogos são válidos
        const jogoDoTrocadorNoBD = await this.jogosRepository.acharPorNome(jogoDoTrocador);
        const jogoDesejadoNoBD = await this.jogosRepository.acharPorNome(jogoDesejado);

        if(!jogoDoTrocadorNoBD || !jogoDesejadoNoBD){
            throw new AppError("Jogo inexistente");
        }

        const troca = await this.trocasRepository.criar({
            descricao,
            usuario
        });

        //Registra cada jogo presente em uma troca na tabela trocas_jogos
        await this.trocasJogosRepository.criar({
            troca,
            jogo: jogoDoTrocadorNoBD
        });
        await this.trocasJogosRepository.criar({
            troca,
            jogo: jogoDesejadoNoBD
        });

        return troca;    
    }
}

export default CriaTrocaService;
import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import Convite from '../infra/typeorm/entities/Convite';

import ITrocasRepository from '../repositories/ITrocasRepository';

interface IRequest{
    idUser: string,
    idTroca: string,
}

@injectable()
class ExibeConvitesDeUmaTrocaService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
    ){}

    public async executar({idUser, idTroca} : IRequest):Promise<Convite[]> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        //Verifica se id de troca é valido
        const troca = await this.trocasRepository.acharPorId(idTroca);
        
        if(!troca){
            throw new AppError("Troca não existe");
        }

        //verificar o usuário é o criador da troca
        if(troca.idUser != usuario.id){
            throw new AppError("Troca não pertence ao usuário logado");
        }

        const convites = this.convitesRepository.acharTodosDeUmaTroca(troca);

        return convites;
    }
}

export default ExibeConvitesDeUmaTrocaService;
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import Troca from '../infra/typeorm/entities/Troca';
import Convite from '../infra/typeorm/entities/Convite';
import IConvitesRepository from '../repositories/IConvitesRepository';

interface ITrocaComConvites {
    troca: Troca;   
    convites: Convite[],
}

@injectable()
class ExibeTrocasDeUmUsuarioService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
    ){}

    public async executar(idUser : string):Promise<ITrocaComConvites[]> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        const trocas = await this.trocasRepository.acharTodosDeUmUsuario(usuario);

        const trocasComConvites: ITrocaComConvites[] = [];

        for (let i = 0; i < trocas.length; i++) {
            const convites = await this.convitesRepository.acharTodosDeUmaTroca(trocas[i]);

            trocasComConvites.push({
                troca: trocas[i],
                convites,
            })
        }

        return trocasComConvites;
    }
}

export default ExibeTrocasDeUmUsuarioService;
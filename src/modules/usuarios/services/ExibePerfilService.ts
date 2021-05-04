import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';

import Usuario from '../infra/typeorm/entities/Usuario';

interface IRequest {
    idUser: string,
}

@injectable()
class ExibePerfilService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
    ){}

    public async executar({ idUser }:IRequest):Promise<Usuario> {
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário inexistente", 404);
        }

        return usuario;
    }
}

export default ExibePerfilService;
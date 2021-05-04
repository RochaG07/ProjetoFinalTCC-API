import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';


import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import RetornarPermissoesDeUmAdminService from './RetornarPermissoesDeUmAdminService';

interface IResponse {
    admin: Administrador,
    permissoes: string[]
}

@injectable()
class ExibirDadosDeAdminService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('AdministradoresRepository')
        private administradoresRepository: IAdministradoresRepository,
    ){}

    public async executar(idUser: string):Promise<IResponse> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }

        const admin = await this.administradoresRepository.acharPorIdUser(idUser);

        if(!admin){
            throw new AppError('Admin não existe', 404);
        }

        const retornarPermissoesDeUmAdmin = container.resolve(RetornarPermissoesDeUmAdminService);

        const permissoes = await retornarPermissoesDeUmAdmin.executar(admin.id);

        return {
            admin,
            permissoes
        } 
    }
}

export default ExibirDadosDeAdminService;
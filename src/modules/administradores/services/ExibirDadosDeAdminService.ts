import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';


import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

//import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';
import Permissao from '../infra/typeorm/entities/Permissao';
import IPermissoesRepository from '../repositories/IPermissoesRepository';
import IPermissoesAdministradoresRepository from '../repositories/IPermissoesAdministradoresRepository';
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
        @inject('PermissoesRepository')
        private permissoesRepository: IPermissoesRepository,
        @inject('PermissoesAdministradoresRepository')
        private permissoesAdministradoresRepository: IPermissoesAdministradoresRepository,
        @inject('AdministradoresRepository')
        private administradoresRepository: IAdministradoresRepository,
    ){}

    public async executar(idUser: string):Promise<IResponse> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados");
        }

        const admin = await this.administradoresRepository.acharPorIdUser(idUser);

        if(!admin){
            throw new AppError('Admin não existe');
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
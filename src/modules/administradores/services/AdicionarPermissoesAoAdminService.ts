import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';


import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

//import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';
import Permissao from '../infra/typeorm/entities/Permissao';
import IPermissoesRepository from '../repositories/IPermissoesRepository';
import IPermissoesAdministradoresRepository from '../repositories/IPermissoesAdministradoresRepository';
import RetornarPermissoesDeUmAdminService from './RetornarPermissoesDeUmAdminService';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';

interface IRequest {
    nomeAdmRecebedorDaPermissao: string,
    permissoesAdd: string[],
}

interface IResponse {
    admin: Administrador,
    permissoes: string[]
}

@injectable()
class AdicionarPermissoesAoAdminService{
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

    public async executar({nomeAdmRecebedorDaPermissao, permissoesAdd}: IRequest):Promise<IResponse> {

        const usuario = await this.usuariosRepository.acharPorUsername(nomeAdmRecebedorDaPermissao);

        if(!usuario){
            throw new AppError('nome do usuário admin não existe');
        }

        const admin = await this.administradoresRepository.acharPorIdUser(usuario.id);

        if(!admin){
            throw new AppError('Admin não existe');
        }

        console.log(nomeAdmRecebedorDaPermissao+' | '+ permissoesAdd);

        for (let i = 0; i < permissoesAdd.length; i++) {
            const permissao = await this.permissoesRepository.acharPorNome(permissoesAdd[i]);

            if(permissao){
                await this.permissoesAdministradoresRepository.criar({
                    idAdm: admin.id,
                    idPerm: permissao.id
                });
            }
        }

        const retornarPermissoesDeUmAdmin = container.resolve(RetornarPermissoesDeUmAdminService);

        const permissoes = await retornarPermissoesDeUmAdmin.executar(admin.id);

        return {
            admin,
            permissoes,
        }
    }
}

export default AdicionarPermissoesAoAdminService;
import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

//import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';

@injectable()
class AtribuiStatusDeAdmService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('AdministradoresRepository')
        private administradoresRepository: IAdministradoresRepository,
    ){}

    public async executar(username: string):Promise<Administrador> {
        const usuario = await this.usuariosRepository.acharPorUsername(username);

        if(!usuario) {
            throw new AppError('Usuário inexistente');  
        }

        if(usuario.possuiStatusDeAdm){
            throw new AppError('Usuário já possui status de admin');  
        }

        usuario.possuiStatusDeAdm = true;
        this.usuariosRepository.salvar(usuario);
 
        const adm = await this.administradoresRepository.atribuiStatusDeAdm(usuario);

        return adm;
    }
}

export default AtribuiStatusDeAdmService;
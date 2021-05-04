import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

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
            throw new AppError('Usuário inexistente', 404);  
        }

        let adm = await this.administradoresRepository.acharPorIdUser(usuario.id);

        if(!adm){
            //Usuário sem admin prévio, cria novo
        
            adm = await this.administradoresRepository.atribuiStatusDeAdm(usuario); 
        } else {
            //Usuário já tem admin, reativar

            if(adm.ativo){
                throw new AppError('Status de adm já ativo', 406);  
            }
    
            adm.ativo = true;
            this.administradoresRepository.salvar(adm);
        }

        usuario.possuiStatusDeAdm = true;
        this.usuariosRepository.salvar(usuario);

        return adm;
    }
}

export default AtribuiStatusDeAdmService;
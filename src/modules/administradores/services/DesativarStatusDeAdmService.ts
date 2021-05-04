import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

import IPermissoesAdministradoresRepository from '../repositories/IPermissoesAdministradoresRepository';

interface IRequest{
    idAdmResponsavel: string,
    username: string
}

@injectable()
class DesativarStatusDeAdmService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('AdministradoresRepository')
        private administradoresRepository: IAdministradoresRepository,
        @inject('PermissoesAdministradoresRepository')
        private permissoesAdministradoresRepository: IPermissoesAdministradoresRepository,
    ){}

    public async executar({username, idAdmResponsavel}: IRequest):Promise<void> {
        const usuario = await this.usuariosRepository.acharPorUsername(username);

        if(!usuario) {
            throw new AppError('Usuário inexistente', 404);  
        }

        const adm = await this.administradoresRepository.acharPorIdUser(usuario.id);

        if(!adm){
            throw new AppError('Usuário não possui status de admin', 404);  
        }

        if(!adm.ativo){
            throw new AppError('Status de admin já esta inativo', 406);  
        }
 
        if(adm.id === idAdmResponsavel){
            throw new AppError('Não é possível remover o próprio status de admin', 406);  
        }

        usuario.possuiStatusDeAdm = false;
        this.usuariosRepository.salvar(usuario);

        adm.ativo = false;
        this.administradoresRepository.salvar(adm);
        
        await this.permissoesAdministradoresRepository.deletarTodasDeUmAdm(adm.id);
    }
}

export default DesativarStatusDeAdmService;
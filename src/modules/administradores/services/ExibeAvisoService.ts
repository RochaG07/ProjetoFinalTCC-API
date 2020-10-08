import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

//import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';
import IAvisosRepository from '../repositories/IAvisosRepository';
import Aviso from '../infra/typeorm/entities/Aviso';

@injectable()
class ExibeAvisoService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('AdministradoresRepository')
        private administradoresRepository: IAdministradoresRepository,
        @inject('AvisosRepository')
        private avisosRepository: IAvisosRepository,
    ){}

    public async executar(idUser: string):Promise<Aviso[]> {
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario) {
            throw new AppError('Usuário inexistente');  
        }

        const aviso = await this.avisosRepository.exibirTodosDeUsuario(usuario);

        return aviso;
    }
}

export default ExibeAvisoService;
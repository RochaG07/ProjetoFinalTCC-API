import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

//import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';
import IAvisosRepository from '../repositories/IAvisosRepository';
import Aviso from '../infra/typeorm/entities/Aviso';
interface IRequest{
    username: string,
    titulo: string,
    conteudo: string,
    idAdm: string,
}

@injectable()
class EnviaAvisoService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('AdministradoresRepository')
        private administradoresRepository: IAdministradoresRepository,
        @inject('AvisosRepository')
        private avisosRepository: IAvisosRepository,
    ){}

    public async executar({username, titulo, conteudo, idAdm}: IRequest):Promise<Aviso> {
        const usuario = await this.usuariosRepository.acharPorUsername(username);

        if(!usuario) {
            throw new AppError('Usuário inexistente');  
        }

        const aviso = await this.avisosRepository.criar({usuario, titulo, conteudo, idAdm});

        return aviso;
    }
}

export default EnviaAvisoService;
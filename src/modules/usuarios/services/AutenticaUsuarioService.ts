import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Usuario from '../infra/typeorm/entities/Usuario';

interface IRequest {
    username: string,
    senha: string,
}

interface IResponse {
    usuario: Usuario,
    token: string,
}

@injectable()
class AutenticaUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async executar({username, senha}:IRequest):Promise<IResponse> {
        const usuario = await this.usuariosRepository.acharPorUsername(username);
        
        if(!usuario){
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(senha, usuario.senha);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: usuario.id,
            expiresIn,
        });

        return {
            usuario,
            token,
        };
    }

}

export default AutenticaUsuarioService;
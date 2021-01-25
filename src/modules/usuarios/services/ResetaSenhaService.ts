import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import ITokensUsuariosRepository from '../repositories/ITokensUsuariosRepository';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { addHours, isAfter } from 'date-fns';

//import User from '../infra/typeorm/entities/User';


interface IRequest {
    token: string,
    senha: string,
}

@injectable()
class ResetaSenhaService {  
    constructor (
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
        
        @inject('TokensUsuariosRepository')
        private tokensUsuariosRepository: ITokensUsuariosRepository,
    ){}

    public async execute({ token, senha }: IRequest): Promise<void> {
        const usuarioToken = await this.tokensUsuariosRepository.acharPorToken(token);

        if (!usuarioToken) {
            throw new AppError('Token do usuário não existe');
        }

        const usuario = await this.usuariosRepository.acharPorId(usuarioToken.idUser)

        if (!usuario) {
            throw new AppError('Usuário não existe');
        }

        const tokenDataCriacao = usuarioToken.dataCriacao;
        const compararData = addHours(tokenDataCriacao, 2);

        if(isAfter(Date.now(), compararData)) {
            throw new AppError('Token expired.');
        }

        usuario.senha = await this.hashProvider.generateHash(senha);

        await this.usuariosRepository.salvar(usuario);
    }
}

export default ResetaSenhaService;
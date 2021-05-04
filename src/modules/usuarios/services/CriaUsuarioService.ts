import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Usuario from '../infra/typeorm/entities/Usuario';
import IPremiumRepository from '../repositories/IPremiumRepository';

interface IRequest {
    username: string,
    email: string,
    senha: string,
    nome: string,
    telefone?: string;
    municipio: string; 
    estado: string;
}

@injectable()
class CriaUsuarioService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async executar({username, email, senha, nome, telefone, municipio, estado }:IRequest):Promise<Usuario> {
        //Não se pode criar um novo usuário com o username repetido
        const usernameContidoBD = await this.usuariosRepository.acharPorUsername(username);

        if(usernameContidoBD) {
            throw new AppError('Não se pode criar um novo usuario com o username repetido', 401);  
        }
 
        //Não se pode criar um novo usuário com o email repetido
        const emailContidoBD = await this.usuariosRepository.acharPorEmail(email);

        if(emailContidoBD) {
            throw new AppError('Não se pode criar um novo usuario com o email repetido', 401);
        }

        const senhaComHash = await this.hashProvider.generateHash(senha);

        const usuario = await this.usuariosRepository.criar({
            username,
            email,
            senha: senhaComHash,
            nome,
            telefone,
            municipio,
            estado
        });

        await this.premiumRepository.criar(usuario.id);

        return usuario;
    }
}

export default CriaUsuarioService;
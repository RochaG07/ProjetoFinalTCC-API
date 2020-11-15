import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import AtribuiPlanoParaUsuario from './AtribuiPlanoParaUsuario';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Usuario from '../infra/typeorm/entities/Usuario';

interface IRequest {
    username: string,
    email: string,
    senha: string,
    nome: string,
    telefone?: string;
    bairro: string; 
    cidade: string;
    uf: string;
}

@injectable()
class CriaUsuarioService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async executar({username, email, senha, nome, telefone, bairro, cidade, uf }:IRequest):Promise<Usuario> {
        //Não se pode criar um novo usuário com o username repetido
        const usernameContidoBD = await this.usuariosRepository.acharPorUsername(username);

        if(usernameContidoBD) {
            throw new AppError('nao se pode criar um novo usuario com o username repetido');  
        }
 
        //Não se pode criar um novo usuário com o email repetido
        const emailContidoBD = await this.usuariosRepository.acharPorEmail(email);

        if(emailContidoBD) {
            throw new AppError('nao se pode criar um novo usuario com o email repetido');
        }

        const senhaComHash = await this.hashProvider.generateHash(senha);

        const usuario = await this.usuariosRepository.criar({
            username,
            email,
            senha: senhaComHash,
            nome,
            telefone,
            bairro,
            cidade,
            uf
        });

        //Define o plano do usuario recém criado
        //const atribuiPlanoParaUsuario = container.resolve(AtribuiPlanoParaUsuario);
        
        //await atribuiPlanoParaUsuario.executar(usuario);

        return usuario;
    }
}

export default CriaUsuarioService;
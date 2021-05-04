import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Usuario from '../infra/typeorm/entities/Usuario';

interface IRequest {
    idUser: string,
    nome: string, 
    email: string,
    senha_antiga: string,
    senha: string
    telefone: string,
    municipio: string,
    estado: string
}

@injectable()
class AtualizaPerfilService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async executar({ idUser ,nome, email, senha_antiga, senha, telefone, municipio, estado }:IRequest):Promise<Usuario> {
        const usuario = await this.usuariosRepository.acharPorId(idUser);
        
        if(!usuario){
            throw new AppError('Combinação de email/senha incorreta', 401);
        }

        const userComEmailAtualizado = await this.usuariosRepository.acharPorEmail(email);

        if(userComEmailAtualizado && userComEmailAtualizado.id !== usuario.id){
            throw new AppError('E-mail já em uso', 401);
        }

        usuario.nome = nome;
        usuario.email = email;
        usuario.telefone = telefone;
        usuario.municipio = municipio;
        usuario.estado = estado;

        if(senha && !senha_antiga){
         throw new AppError('Você precisa informar a senha antiga para definir uma nova', 401);
        }
        
        if(senha && senha_antiga){
            const checaSenhaAntiga = await this.hashProvider.compareHash(
                senha_antiga,
                usuario.senha,
            );

            if(!checaSenhaAntiga){
                throw new AppError('Senha inválida', 401);
            }

            usuario.senha = await this.hashProvider.generateHash(senha);
        }

        return this.usuariosRepository.salvar(usuario);
    }
}

export default AtualizaPerfilService;

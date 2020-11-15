import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Usuario from '../infra/typeorm/entities/Usuario';

interface IRequest {
    idUser: string,
    avatarNomeArquivo: string,
}

@injectable()
class AtualizaAvatarService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ){}

    public async executar({ idUser, avatarNomeArquivo }:IRequest):Promise<Usuario> {
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados podem alterar avatar");
        }

        //Deleta avatar antigo do usuário se tiver algum
        if(usuario.avatar){
            await this.storageProvider.deletarArquivo({
                arquivo: usuario.avatar,
                pasta: 'avatares',
            });
        }

        const nomeArquivo = await this.storageProvider.salvarArquivo({
            arquivo: avatarNomeArquivo,
            pasta:'avatares'
        });

        usuario.avatar = nomeArquivo;

        await this.usuariosRepository.salvar(usuario);

        return usuario;
    }
}

export default AtualizaAvatarService;
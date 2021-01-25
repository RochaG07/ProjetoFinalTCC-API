import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AtualizaAvatarService from '@modules/usuarios/services/AtualizaAvatarService';

export default class UsuarioAvatarController{
    public async atualizar( request: Request, response: Response ):Promise<Response>{
        const atualizaAvatarUsuario = container.resolve(AtualizaAvatarService);

        console.log(request.file);
        
        const usuario = await atualizaAvatarUsuario.executar({
            idUser: request.user.id,
            avatarNomeArquivo: request.file.filename,
        });

        return response.json(classToClass(usuario));
    }
}

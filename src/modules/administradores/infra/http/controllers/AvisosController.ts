import { Request, Response } from 'express';

import { container } from 'tsyringe';

import EnviaAvisoService from '@modules/administradores/services/EnviaAvisoService';
import ExibeAvisoService from '@modules/administradores/services/ExibeAvisoService';
import AppError from '@shared/errors/AppError';

export default class AvisosController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const {username, titulo, conteudo} = request.body;

        if(!request.admin.permissoes.includes('enviar_avisos')){
            throw new AppError("Erro: Admin não possui permissão para enviar avisos");
        }

        const enviaAviso = container.resolve(EnviaAvisoService);

        const aviso = await enviaAviso.executar({
            username,
            titulo,
            conteudo,
            idAdm: request.admin.id,
        });

        return response.json(aviso);
    }

    public async exibir( request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        const exibeAviso = container.resolve(ExibeAvisoService);

        const aviso = await exibeAviso.executar(idUser);

        return response.json(aviso);
    }
}
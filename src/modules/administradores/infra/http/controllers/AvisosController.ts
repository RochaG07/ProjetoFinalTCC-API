import { Request, Response } from 'express';

import { container } from 'tsyringe';

import EnviaAvisoService from '@modules/administradores/services/EnviaAvisoService';
import DesativaAvisoService from '@modules/administradores/services/DesativaAvisoService';
import AppError from '@shared/errors/AppError';

export default class AvisosController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const {username, titulo, conteudo} = request.body;

        if(!request.admin.permissoes.includes('enviar_avisos')){
            throw new AppError("Erro: Admin não possui permissão para enviar avisos", 401);
        }

        const enviaAviso = container.resolve(EnviaAvisoService);

        const aviso = await enviaAviso.executar({
            username,
            titulo,
            conteudo,
            idAdm: request.admin.id,
        });

        return response.status(201).json(aviso);
    }

    public async desativar( request: Request, response: Response ):Promise<Response>{
        const {idAviso} = request.params;

        const desativaAviso = container.resolve(DesativaAvisoService);

        await desativaAviso.executar({idAviso});

        return response.status(204).json();
    }
}
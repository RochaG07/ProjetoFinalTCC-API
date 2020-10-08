import { Request, Response } from 'express';

import { container } from 'tsyringe';


import CriaJogoService from '@modules/jogos/services/CriaJogoService';
import { classToClass } from 'class-transformer';

export default class ConsolesController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const {nome, consoles} = request.body;

        const criaJogo = container.resolve(CriaJogoService);

        const jogo = await criaJogo.executar({
            nome,
            consoles,
            idAdm: request.admin.id,
            capa: request.file.filename,
        });

        return response.json(classToClass(jogo));
    }
}
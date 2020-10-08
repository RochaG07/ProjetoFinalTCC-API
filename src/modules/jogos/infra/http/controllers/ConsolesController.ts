import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaConsoleService from '@modules/jogos/services/CriaConsoleService';

export default class ConsolesController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const {nome} = request.body;

        const criaConsole = container.resolve(CriaConsoleService);

        const console = await criaConsole.executar({
            nome,
            idAdm: request.admin.id,
        });

        return response.json(console);
    }
}
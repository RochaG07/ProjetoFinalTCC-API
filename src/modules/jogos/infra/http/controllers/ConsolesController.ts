import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaConsoleService from '@modules/jogos/services/CriaConsoleService';
import ExibeConsolesService from '@modules/jogos/services/ExibeConsolesService';
import AppError from '@shared/errors/AppError';

export default class ConsolesController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const {nome} = request.body;

        if(!request.admin.permissoes.includes('cadastrar_consoles')){
            throw new AppError("Erro: Admin não possui permissão para cadastrar consoles");
        }

        const criaConsole = container.resolve(CriaConsoleService);

        const console = await criaConsole.executar({
            nome,
            idAdm: request.admin.id,
        });

        return response.json(console);
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const exibeConsoles = container.resolve(ExibeConsolesService);

        const consoles = await exibeConsoles.executar();

        return response.json(consoles);
    }
}
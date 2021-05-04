import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaConsoleService from '@modules/jogos/services/CriaConsoleService';
import ExibeConsolesService from '@modules/jogos/services/ExibeConsolesService';
import DeletaConsoleService from '@modules/jogos/services/DeletaConsoleService';
import AppError from '@shared/errors/AppError';

export default class ConsolesController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const {nome} = request.body;

        if(!request.admin.permissoes.includes('cadastrar_consoles')){
            throw new AppError("Erro: Admin não possui permissão para cadastrar consoles", 401);
        }

        const criaConsole = container.resolve(CriaConsoleService);

        const console = await criaConsole.executar({
            nome,
            idAdm: request.admin.id,
        });

        return response.status(201).json(console);
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const exibeConsoles = container.resolve(ExibeConsolesService);

        const consoles = await exibeConsoles.executar();

        return response.status(200).json(consoles);
    }
    
    public async deletar(request: Request, response: Response ):Promise<Response>{
        const {idConsole} = request.params;

        if(!request.admin.permissoes.includes('deletar_consoles')){
            throw new AppError("Erro: Admin não possui permissão para deletar jogos", 401);
        }

        const deletaConsole = container.resolve(DeletaConsoleService);

        await deletaConsole.executar({idConsole});

        return response.status(204).json();
    }
}
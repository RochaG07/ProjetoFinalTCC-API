import { Request, Response } from 'express';

import { container } from 'tsyringe';


import CriaJogoService from '@modules/jogos/services/CriaJogoService';
import ExibeJogosService from '@modules/jogos/services/ExibeJogosService';
import DeletaJogoService from '@modules/jogos/services/DeletaJogoService';

import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

export default class ConsolesController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const {nome, consoles} = request.body;

        if(!request.admin.permissoes.includes('cadastrar_jogos')){
            throw new AppError("Erro: Admin não possui permissão para cadastrar jogos", 401);
        }

        const criaJogo = container.resolve(CriaJogoService);

        const jogo = await criaJogo.executar({
            nome,
            consoles,
            idAdm: request.admin.id,
            capa: request.file.filename,
        });

        return response.status(201).json(classToClass(jogo));
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const exibeJogos = container.resolve(ExibeJogosService);

        const jogos = await exibeJogos.executar();

        return response.status(200).json(jogos);
    }

    public async deletar(request: Request, response: Response ):Promise<Response>{
        const {idJogo} = request.params;

        if(!request.admin.permissoes.includes('deletar_jogos')){
            throw new AppError("Erro: Admin não possui permissão para deletar jogos", 401);
        }

        const deletaJogo = container.resolve(DeletaJogoService);

        await deletaJogo.executar({idJogo});

        return response.status(204).json();
    }
}
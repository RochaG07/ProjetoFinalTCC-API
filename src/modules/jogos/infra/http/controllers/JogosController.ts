import { Request, Response } from 'express';

import { container } from 'tsyringe';


import CriaJogoService from '@modules/jogos/services/CriaJogoService';
import ExibeJogosService from '@modules/jogos/services/ExibeJogosService';

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

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const exibeJogos = container.resolve(ExibeJogosService);

        const jogos = await exibeJogos.executar();

        return response.json(jogos);
    }
}
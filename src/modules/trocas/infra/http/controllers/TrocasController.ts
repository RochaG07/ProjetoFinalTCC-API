import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaTrocaService from '@modules/trocas/services/CriaTrocaService';
import ExibeTrocasDeUmUsuarioService from '@modules/trocas/services/ExibeTrocasDeUmUsuarioService';

export default class TrocasController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const {descricao, jogoDoTrocador, jogoDesejado} = request.body;

        const criaTroca = container.resolve(CriaTrocaService);

        const troca = await criaTroca.executar({
            descricao,
            idUser,
            jogoDoTrocador,
            jogoDesejado
        });

        return response.json(troca);
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        const exibeTrocas = container.resolve(ExibeTrocasDeUmUsuarioService);

        const troca = await exibeTrocas.executar(idUser);

        return response.json(troca);
    }

}
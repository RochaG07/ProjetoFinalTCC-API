import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaTrocaService from '@modules/trocas/services/CriaTrocaService';
import ExibeTrocas from '@modules/trocas/services/ExibeTrocasService';
import ExibeTrocasDeUmUsuario from '@modules/trocas/services/ExibeTrocasDeUmUsuarioService';
import DesativaTroca from '@modules/trocas/services/DesativaTrocaService';

export default class TrocasController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const {descricao, idJogoOfertado, idJogoDesejado, consoleJogoDesejado, consoleJogoOfertado} = request.body;

        const criaTroca = container.resolve(CriaTrocaService);

        const troca = await criaTroca.executar({
            descricao,
            idUser,
            idJogoOfertado,
            idJogoDesejado,
            consoleJogoDesejado,
            consoleJogoOfertado
        });

        return response.json(troca);
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        const exibeTrocas = container.resolve(ExibeTrocas);

        const troca = await exibeTrocas.executar(idUser);

        return response.json(troca);
    }

    public async exibirDoUsuario(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        const exibeTrocas = container.resolve(ExibeTrocasDeUmUsuario);

        const troca = await exibeTrocas.executar(idUser);

        return response.json(troca);
    }

    public async desativar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const {idTroca} = request.params;

        const desativaTroca = container.resolve(DesativaTroca);

        await desativaTroca.executar({idUser, idTroca});

        return response.json('sucesso');
    }
}
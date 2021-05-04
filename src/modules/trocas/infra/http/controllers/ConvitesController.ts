import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaConviteService from '@modules/trocas/services/CriaConviteService';
import ExibeConvitesDeUmaTrocaService from '@modules/trocas/services/ExibeConvitesDeUmaTrocaService';
import RespondeConviteService from '@modules/trocas/services/RespondeConviteService';

export default class ConvitesController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const { mensagem, idTroca } = request.body;
        const idUser = request.user.id;

        const criaConvite = container.resolve(CriaConviteService);

        const {convite, troca} = await criaConvite.executar({
            mensagem,
            idTroca,
            idUser
        });

        return response.status(201).json({
            convite, 
            troca
        });
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const { idTroca } = request.params;

        const exibeConvites = container.resolve(ExibeConvitesDeUmaTrocaService);

        const convite = await exibeConvites.executar({idUser, idTroca});

        return response.status(200).json(convite);
    }


    public async alterar(request: Request, response: Response ):Promise<Response>{
        const { idConvite, respostaAoConvite } = request.body;
        const idUser = request.user.id;

        const respondeConvite = container.resolve(RespondeConviteService);

        const convite = await respondeConvite.executar({
            idConvite,
            idUser,
            respostaAoConvite
        });

        return response.status(200).json(convite);
    }
}
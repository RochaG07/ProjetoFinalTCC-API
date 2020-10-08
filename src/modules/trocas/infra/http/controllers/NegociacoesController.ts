import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ExibeNegociacoesDeUmaTrocaService from '@modules/trocas/services/ExibeNegociacoesDeUmaTrocaService';

export default class NegociacoesController{
    public async exibir(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const {idTroca} = request.params;

        const exibeNegociacoes = container.resolve(ExibeNegociacoesDeUmaTrocaService);

        const negs = await exibeNegociacoes.executar({idTroca, idUser});

        return response.json(negs);
    }
}
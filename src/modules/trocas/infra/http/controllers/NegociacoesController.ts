import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ExibeNegociacoesDeUmUsuarioService from '@modules/trocas/services/ExibeNegociacoesDeUmUsuarioService';
import DesativaNegociacaoService from '@modules/trocas/services/DesativaNegociacaoService';

export default class NegociacoesController{
    public async exibir(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        const exibeNegociacoes = container.resolve(ExibeNegociacoesDeUmUsuarioService);

        const negs = await exibeNegociacoes.executar(idUser);

        return response.json(negs);
    }

    public async desativar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const {idNeg} = request.params;

        const desativaNegociacao = container.resolve(DesativaNegociacaoService);

        await desativaNegociacao.executar({idUser, idNeg});

        return response.json('sucesso');
    }
}
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AtribuiStatusDeAdmService from '@modules/administradores/services/AtribuiStatusDeAdmService';

export default class AdministradoresController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const {username} = request.body;

        const atribuiStatusDeAdmService = container.resolve(AtribuiStatusDeAdmService);

        const adm = await atribuiStatusDeAdmService.executar(username);

        return response.json(adm);
    }
}
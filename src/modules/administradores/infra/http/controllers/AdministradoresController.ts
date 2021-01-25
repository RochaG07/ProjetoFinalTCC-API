import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AtribuiStatusDeAdmService from '@modules/administradores/services/AtribuiStatusDeAdmService';
import ExibirDadosDeAdminService from '@modules/administradores/services/ExibirDadosDeAdminService';
import AppError from '@shared/errors/AppError';


export default class AdministradoresController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const {username} = request.body;

        if(!request.admin.permissoes.includes('atribuir_status_de_admin')){
            throw new AppError("Erro: Admin não possui permissão para atribuir status de admin a um usuário");
        }

        const atribuiStatusDeAdmService = container.resolve(AtribuiStatusDeAdmService);

        const adm = await atribuiStatusDeAdmService.executar(username);

        return response.json(adm);
    }

    public async exibir( request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;           

        const exibirDadosDeAdmin = container.resolve(ExibirDadosDeAdminService);

        const adm = await exibirDadosDeAdmin.executar(idUser);

        return response.json(adm);
    }
}
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AtribuiStatusDeAdmService from '@modules/administradores/services/AtribuiStatusDeAdmService';
import DesativarStatusDeAdmService from '@modules/administradores/services/DesativarStatusDeAdmService';
import ExibirDadosDeAdminService from '@modules/administradores/services/ExibirDadosDeAdminService';
import AppError from '@shared/errors/AppError';

export default class AdministradoresController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const {username} = request.body;

        if(!request.admin.permissoes.includes('atribuir_status_de_admin')){
            throw new AppError("Erro: Admin não possui permissão para atribuir status de admin a outro usuário", 401);
        }

        const atribuiStatusDeAdmService = container.resolve(AtribuiStatusDeAdmService);

        const adm = await atribuiStatusDeAdmService.executar(username);

        return response.status(201).json(adm);
    }

    public async exibir( request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;           

        const exibirDadosDeAdmin = container.resolve(ExibirDadosDeAdminService);

        const adm = await exibirDadosDeAdmin.executar(idUser);

        return response.status(200).json(adm);
    }

    public async deletar( request: Request, response: Response ):Promise<Response>{
        const {username} = request.params;

        if(!request.admin.permissoes.includes('desativar_status_de_admin')){
            throw new AppError("Erro: Admin não possui permissão para desativar status de admin de outro usuário", 401);
        }

        const desativarStatusDeAdm = container.resolve(DesativarStatusDeAdmService);

        await desativarStatusDeAdm.executar({
            username,
            idAdmResponsavel: request.admin.id
        });

        return response.status(204).json();
    }
}
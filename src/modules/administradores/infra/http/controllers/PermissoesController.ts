import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AdicionarPermissoesAoAdminService from '@modules/administradores/services/AdicionarPermissoesAoAdminService';
import AppError from '@shared/errors/AppError';

export default class PermissoesController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const { permissoes, nomeAdmRecebedorDaPermissao} = request.body;

        if(!request.admin.permissoes.includes('add_permissoes')){
            throw new AppError("Erro: Admin não possui permissão para adicionar permissões a outro admins");
        }

        const adicionarPermissoesAoAdmin = container.resolve(AdicionarPermissoesAoAdminService);

        const adm = await adicionarPermissoesAoAdmin.executar({nomeAdmRecebedorDaPermissao, permissoesAdd: permissoes });

        return response.json(adm);
    }
}
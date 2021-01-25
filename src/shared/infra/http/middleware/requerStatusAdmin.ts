import { container } from 'tsyringe';

import {Request, Response, NextFunction } from 'express';

import AdministradoresRepository from '@modules/administradores/infra/typeorm/repositories/AdministradoresRepository'; 
import RetornarPermissoesDeUmAdminService from '@modules/administradores/services/RetornarPermissoesDeUmAdminService'; 

import AppError from '@shared/errors/AppError';

export default async function requerStatusAdmin(
    request: Request,
    response: Response, 
    next: NextFunction,
    ): Promise<void> {
    //Verifica se o id de usuário está presente na table administradores
    
    const adminRepo = container.resolve(AdministradoresRepository);
    const admin = await adminRepo.acharPorIdUser(request.user.id);

    if(!admin){
        throw new AppError("O usuário não é um administrador");
    } 

    const permissoesDeUmAdmin = container.resolve(RetornarPermissoesDeUmAdminService);

    const permissoes = await permissoesDeUmAdmin.executar(admin.id);

    request.admin = {
        id: admin.id, 
        permissoes,
    }
    
    next();
}
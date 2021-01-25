import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AutenticaUsuarioService from '@modules/usuarios/services/AutenticaUsuarioService';

export default class SessoesController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const {username, senha} = request.body;

        const autenticaUsuario = container.resolve(AutenticaUsuarioService);

        const {usuario, token, premiumAtivo} = await autenticaUsuario.executar({username, senha});

        return response.json({usuario:classToClass(usuario), token, premiumAtivo});
    }
}
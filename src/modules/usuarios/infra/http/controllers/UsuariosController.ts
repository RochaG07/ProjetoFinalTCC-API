import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CriaUsuarioService from '@modules/usuarios/services/CriaUsuarioService';

export default class UsuariosController{
    public async criar( request: Request, response: Response ):Promise<Response>{
        const {username, email, senha, nome, telefone, municipio, estado} = request.body;

        const criaUsuario = container.resolve(CriaUsuarioService);

        const usuario = await criaUsuario.executar({
            username,
            email,
            senha,
            nome,
            telefone,
            municipio,
            estado
        });

        return response.status(201).json(classToClass(usuario));
    }
}
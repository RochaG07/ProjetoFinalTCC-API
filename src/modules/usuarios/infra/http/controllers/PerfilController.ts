import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ExibePerfilService from '@modules/usuarios/services/ExibePerfilService';
import AtualizaPerfilService from '@modules/usuarios/services/AtualizaPerfilService';
import { classToClass } from 'class-transformer';

export default class SessoesController{
    public async mostrar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        const exibePerfil = container.resolve(ExibePerfilService);

        const usuario = await exibePerfil.executar({idUser});

        return response.status(200).json(classToClass(usuario));
    }

    public async atualizar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;           
        const { nome, email, senha_antiga, senha, telefone, municipio, estado } = request.body;

        const atualizaPerfil = container.resolve(AtualizaPerfilService);
    
        const usuario = await atualizaPerfil.executar({
            idUser,
            nome, 
            email,
            senha_antiga,
            senha,
            telefone,
            municipio,
            estado
        });
    
        return response.status(200).json(classToClass(usuario));
    }
}
import { Request, Response } from 'express';
import { container } from 'tsyringe'

import ResetaSenhaService from '@modules/usuarios/services/ResetaSenhaService';

export default class ResetaSenhaController {
    public async criar( request: Request, response: Response ): Promise<Response> {
        const { token, senha } = request.body;

        const resetaSenha = container.resolve(ResetaSenhaService);
    
        await resetaSenha.execute({
            token, 
            senha
        });
    
        return response.status(201).json();
    }
}
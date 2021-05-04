import { Request, Response } from 'express';
import { container } from 'tsyringe'

import EnviaEmailEsqueciMinhaSenhaService from '@modules/usuarios/services/EnviaEmailEsqueciMinhaSenhaService';

export default class EsqueciMinhaSenhaController {
    public async criar( request: Request, response: Response ): Promise<Response> {
        const { email } = request.body;

        const enviaEmailEsqueciMinhaSenha = container.resolve(EnviaEmailEsqueciMinhaSenhaService);
    
        await enviaEmailEsqueciMinhaSenha.execute({
            email, 
        });
    
        return response.status(201).json();
    }
}
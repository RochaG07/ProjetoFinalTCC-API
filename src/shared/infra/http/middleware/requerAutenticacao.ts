//Middleware que vai verificar se o usuário realmente está autenticado na aplicação

import authConfig from '@config/auth';
import {Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';


interface TokenPayload {
    iat: number,
    exp: number,
    sub: string,
}

export default function requerAutenticacao(
    request: Request,
    response: Response, 
    next: NextFunction,
    ): void {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('Token JWT não encontrado', 404);
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        //Informação do usuário logado
        request.user = {
            id: sub,
        }
        
        return next();
    } catch {
        throw new AppError('Token JWT inválido', 401);
    }
}
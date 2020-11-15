import { Request, Response } from 'express';

import { container } from 'tsyringe';

import RealizaAssinaturaPremiumService from '@modules/usuarios/services/RealizaAssinaturaPremiumService';

export default class PremiumController{
    public async criar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;
        const payment_method = request.body;

        const realizaAssinaturaPremium = container.resolve(RealizaAssinaturaPremiumService);
    
        const subscription = await realizaAssinaturaPremium.executar({idUser, payment_method});
    
        return response.json(subscription);
    }
}
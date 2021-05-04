import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AssinarPremiumService from '@modules/usuarios/services/AssinarPremiumService';

export default class PremiumController{
    public async criar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;
        const { paymentMethodId} = request.body;

        const assinarPremium = container.resolve(AssinarPremiumService);

        const premium = await assinarPremium.executar({idUser, paymentMethodId});
    
        return response.status(201).json(premium);
    }
}
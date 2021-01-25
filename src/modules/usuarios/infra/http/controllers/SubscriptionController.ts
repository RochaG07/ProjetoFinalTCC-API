import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaSubscriptionService from '@modules/usuarios/services/CriaSubscriptionService';
import RetornaAssinaturaService from '@modules/usuarios/services/RetornaAssinaturaService';

export default class SubscriptionController{
    public async criar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;
        const { paymentMethodId} = request.body;

        const criaSubscription = container.resolve(CriaSubscriptionService);
    
        const subscription = await criaSubscription.executar({idUser, paymentMethodId});
    
        return response.json(subscription);
    }
}
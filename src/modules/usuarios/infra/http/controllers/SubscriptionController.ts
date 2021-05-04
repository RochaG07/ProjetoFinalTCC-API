import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaSubscriptionService from '@modules/usuarios/services/CriaSubscriptionService';
import CancelaSubscriptionService from '@modules/usuarios/services/CancelaSubscriptionService';
import RetentarPagamentoComOutroPaymentMethodService from '@modules/usuarios/services/RetentarPagamentoComOutroPaymentMethodService';

export default class SubscriptionController{
    public async criar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;
        const { paymentMethodId} = request.body;

        const criaSubscription = container.resolve(CriaSubscriptionService);
    
        const subscription = await criaSubscription.executar({idUser, paymentMethodId});
    
        return response.status(201).json(subscription);
    }

    public async alterar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;
        const { paymentMethodId} = request.body;

        const retentarPagamentoComOutroPaymentMethodService = container.resolve(RetentarPagamentoComOutroPaymentMethodService);
    
        await retentarPagamentoComOutroPaymentMethodService.executar({idUser, paymentMethodId});
    
        return response.status(204).json();
    }

    public async cancelar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;

        const cancelaSubscription = container.resolve(CancelaSubscriptionService);
    
        await cancelaSubscription.executar({idUser});
    
        return response.status(204).json();
    }
}
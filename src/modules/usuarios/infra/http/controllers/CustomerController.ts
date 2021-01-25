import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaCustomerService from '@modules/usuarios/services/CriaCustomerService';
import AchaUsuarioPeloCustomerIdService from '@modules/usuarios/services/AchaUsuarioPeloCustomerIdService';

import AtribuiPaymentMethodAoCustomerService from '@modules/usuarios/services/AtribuiPaymentMethodAoCustomerService';
import { classToClass } from 'class-transformer';

export default class CustomerController{
    public async criar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;

        const criaCustomer = container.resolve(CriaCustomerService);
    
        const usuario = await criaCustomer.executar(idUser);
    
        return response.json(classToClass(usuario));
    }

    public async achar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;

        const achaCustomer = container.resolve(AchaUsuarioPeloCustomerIdService);
    
        const usuario = await achaCustomer.executar(idUser);

        return response.json(classToClass(usuario));
    }

    public async alterar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;
        const { paymentMethodId} = request.body;

        const alteraCustomer = container.resolve(AtribuiPaymentMethodAoCustomerService);
    
        await alteraCustomer.executar({idUser, paymentMethodId});

        return response.json('ok');
    }
}
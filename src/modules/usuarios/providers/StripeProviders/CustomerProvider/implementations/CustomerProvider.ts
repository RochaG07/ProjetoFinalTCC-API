import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import ICustomerProvider from '../models/ICustomerProvider';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

import Stripe from 'stripe';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';

import PaymentMethodProvider from '../../PaymentMethodProvider/implementations/PaymentMethodProvider';
interface ITornarPaymentMethodPadrao{
    paymentMethodId: string,
    customerId: string,
}

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});
class CustomerProvider implements ICustomerProvider{
    public async cadastrarCustomer(usuario: Usuario): Promise<Stripe.Customer>{
        //Registra um objeto Customer no Stripe com os dados do usuário,
        //Registra o customer_id no usuário = ligação entre a api e o stripe
        //Validar premium do usuário com base no customer_id
        //Associar o customer com usuário

        let customersExistentes = await stripe.customers.list({email : usuario.email});

        if(customersExistentes.data.length){
            throw new AppError("Usuário já é um Customer");
        } else {
            //const payment_methodProvider = new PaymentMethodProvider();
            //const payment_method = await payment_methodProvider.criarPaymentMethod(payment_method_token);

            const customer = await stripe.customers.create({
                email: usuario.email,
                name: usuario.nome,  
            });

            return customer;
        }
    }   
    
    public async getCustomer(email: string): Promise<Stripe.Customer | undefined>{ 
        let customer;

        Promise.resolve(
            stripe.customers.list({email})
        ).then(stripeData => {
            customer = stripeData.data[0];
 
        })

        console.log(customer);

        return customer;
    }
    public async tornarPaymentMethodPadrao({customerId, paymentMethodId}: ITornarPaymentMethodPadrao): Promise<void>{ 
        await stripe.customers.update(
            customerId,
            {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                }
            }
          );
    }
}

export default CustomerProvider;
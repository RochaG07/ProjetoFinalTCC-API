import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import ICustomerProvider from '../models/ICustomerProvider';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

import Stripe from 'stripe';
import AppError from '@shared/errors/AppError';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

class CustomerProvider implements ICustomerProvider{
    public async cadastrarCustomer(usuario: Usuario): Promise<Stripe.Customer>{
        //Registra um objeto Customer no Stripe com os dados do usuário,
        //Registra o customer_id no usuário = ligação entre a api e o stripe
        //Validar premium do usuário com base no customer_id
        //Associar o customer com usuário

        //Método de pagamento são os dados do cartão? 
        //payment_method em customer representa o id do payment method

        let customersExistentes = await stripe.customers.list({email : usuario.email});

        if(customersExistentes.data.length){
            throw new AppError("Usuário já é um Customer");
        } else {
            const customer = await stripe.customers.create({
                email: usuario.email,
                name: usuario.nome,
            });

            console.log(customer);
            return customer;
        }
    }   
    
    public async getCustomer(email: string): Promise<Stripe.Customer | undefined>{ 
        let customer;

        // Provavelmente não funciona
        Promise.resolve(
            stripe.customers.list({email})
        ).then(stripeData => {
            customer = stripeData.data[0];
 
        })

        console.log(customer);

        return customer;
    }
}

export default CustomerProvider;
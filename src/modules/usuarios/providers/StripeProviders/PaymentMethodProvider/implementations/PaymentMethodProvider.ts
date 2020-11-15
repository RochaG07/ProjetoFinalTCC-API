import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IPaymentMethodProvider from '../models/IPaymentMethodProvider';
import Stripe from 'stripe';
import ICriarPaymentMethodDTO from '../dtos/ICriarPaymentMethodDTO';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

//Utilizada para atribuir a um customer, as informações do cartão
// não preciso de um método só pra atribuir um customer um paymentMethod 

class PaymentMethodProvider implements IPaymentMethodProvider{
    public async criarPaymentMethod({idCustomer}: ICriarPaymentMethodDTO): Promise<Stripe.PaymentMethod>{
        const paymentMethod = await stripe.paymentMethods.create({
            customer: idCustomer,
        });

        return paymentMethod;
    }
}

export default PaymentMethodProvider;
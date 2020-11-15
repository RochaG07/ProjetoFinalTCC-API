import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import ISubscriptionProvider from '../models/ISubscriptionProvider';
import Stripe from 'stripe';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

class SubscriptionProvider implements ISubscriptionProvider{
    public async criar(idCustomer: string): Promise<Stripe.Subscription>{
        const subscription = await stripe.subscriptions.create({
            customer: idCustomer,
            items: [{ price: process.env.PRICE_KEY_SERVICO_PREMIUM}],
            expand: ['latest_invoice.payment_intent'],
        });

        return subscription;
    }

    public async verificarSeAtiva(idCustomer: string): Promise<boolean>{
        //TODO
        return true;
    }
}

export default SubscriptionProvider;
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import ISessionProvider from '../models/ISessionProvider';

import Stripe from 'stripe';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

class SessionProvider implements ISessionProvider{
    public async criaSession(): Promise<Stripe.Checkout.Session>{
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
              {
                price: process.env.PRICE_KEY_SERVICO_PREMIUM,
                quantity: 1,
              },
            ],
            //TODO
            success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/canceled.html',
        });

        return session;
    }
}

export default SessionProvider;
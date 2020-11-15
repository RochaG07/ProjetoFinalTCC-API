import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IProductProvider from '../models/IProductProvider';

import Stripe from 'stripe';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

class ProductProvider implements IProductProvider{
    public async getPlanos(): Promise<void>{
        /*Promise.resolve(
            stripe.products.list({})
        ).then(stripeData => {
            var products = stripeData.data;
 
            console.log(products);
        })*/
        //prod_IARnB7OuLYduhe
    }
}

export default ProductProvider;
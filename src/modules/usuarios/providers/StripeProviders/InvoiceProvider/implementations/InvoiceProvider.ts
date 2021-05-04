import IInvoiceProvider from '../models/IInvoiceProvider';

import Stripe from 'stripe';
import IPagarUmInvoiceDTO from '../dtos/IPagarUmInvoiceDTO';
import AppError from '@shared/errors/AppError';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

class InvoiceProvider implements IInvoiceProvider{
    public async pagarUmInvoice({invoiceId, paymentMethodId}: IPagarUmInvoiceDTO): Promise<Stripe.Invoice>{
        try {
            const invoice = await stripe.invoices.pay(invoiceId, {
                payment_method: paymentMethodId
            });

            return invoice;

        } catch(err){
            throw new AppError('O Invoice expirou, cancele essa assinatura', 401);
        }
    } 

    public async deletarUmInvoice(paymentMethodId: string): Promise<void>{
    } 
}

export default InvoiceProvider;
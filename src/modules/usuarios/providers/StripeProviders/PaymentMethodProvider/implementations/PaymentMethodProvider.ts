import IPaymentMethodProvider from '../models/IPaymentMethodProvider';
import Stripe from 'stripe';
import { IAtribuirPaymentMethodAoCustomer } from '../dtos/IAtribuirPaymentMethodAoCustomer';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

//Utilizada para atribuir a um customer, as informações do cartão

class PaymentMethodProvider implements IPaymentMethodProvider{
    public async atribuirPaymentMethodAoCustomer({idCustomer, paymentMethodId}: IAtribuirPaymentMethodAoCustomer): Promise<void>{
            await stripe.paymentMethods.attach(
                paymentMethodId,
                {customer: idCustomer}
            );
    }
}

export default PaymentMethodProvider;
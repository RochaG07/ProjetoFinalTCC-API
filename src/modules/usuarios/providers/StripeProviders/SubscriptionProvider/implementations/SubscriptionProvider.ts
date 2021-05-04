import ISubscriptionProvider, {Icriar, Iatualizar} from '../models/ISubscriptionProvider';
import Stripe from 'stripe';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

class SubscriptionProvider implements ISubscriptionProvider{
    public async criar({idCustomer, paymentMethodId}: Icriar): Promise<Stripe.Subscription>{
        const subscription = await stripe.subscriptions.create({
            customer: idCustomer,
            items: [{ price: process.env.PRICE_KEY_SERVICO_PREMIUM}],
            default_payment_method: paymentMethodId,
            expand: ['latest_invoice.payment_intent'],
        });

        return subscription;
    }    

    public async atualizarCartao({idSubscription, paymentMethodId}: Iatualizar): Promise<Stripe.Subscription>{
        const subscription = await stripe.subscriptions.update(idSubscription, {
            default_payment_method: paymentMethodId
        });

        return subscription;
    }

    public async getSubscription(idSubscription: string): Promise<Stripe.Subscription>{
        const subscription = await stripe.subscriptions.retrieve(idSubscription);

        return subscription;
    }

    public async cancelaSubscription(idSubscription: string): Promise<void>{
        await stripe.subscriptions.del(idSubscription);
    }

    public async retornaUltimoInvoiceId(idSubscription: string): Promise<string | null>{
        const subscription = await this.getSubscription(idSubscription);

        if(subscription.latest_invoice){
            return subscription.latest_invoice.toString();
        }

        return null;
    }
    
}

export default SubscriptionProvider;
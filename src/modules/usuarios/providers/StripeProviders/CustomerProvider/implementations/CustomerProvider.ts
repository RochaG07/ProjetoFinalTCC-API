
import ICustomerProvider, {ITornarPaymentMethodPadrao} from '../models/ICustomerProvider';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

import Stripe from 'stripe';
import AppError from '@shared/errors/AppError';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});
class CustomerProvider implements ICustomerProvider{
    public async cadastrarCustomer(usuario: Usuario): Promise<Stripe.Customer>{
        let customersExistentes = await stripe.customers.list({email : usuario.email});

        if(customersExistentes.data.length){
            throw new AppError("Usuário já é um Customer", 401);
        } else {
            const customer = await stripe.customers.create({
                email: usuario.email,
                name: usuario.nome,  
            });

            return customer;
        }
    }   
    
    public async getCustomer(idCustomer: string): Promise<Stripe.Customer | Stripe.DeletedCustomer>{ 
        const customer = await stripe.customers.retrieve(idCustomer);

        return customer;
    }

    public async tornarPaymentMethodPadrao({idCustomer, paymentMethodId}: ITornarPaymentMethodPadrao): Promise<void>{ 
        console.log('idCustomer: '+idCustomer);
        console.log('paymentMethodId: '+paymentMethodId);

        await stripe.customers.update(
            idCustomer,
            {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                }
            }
          );
    }
}

export default CustomerProvider;
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISessionProvider from '../providers/StripeProviders/SessionProvider/models/ISessionProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import Stripe from 'stripe';
import IPaymentMethodProvider from '../providers/StripeProviders/PaymentMethodProvider/models/IPaymentMethodProvider';
import Usuario from '../infra/typeorm/entities/Usuario';
import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';

@injectable()
class RetornaAssinaturaService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
    ){}
    
    public async executar(idUser: string):Promise<Stripe.Subscription> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados");
        }

        if(!usuario.idSubscription){
            throw new AppError("Usuário não possui assinatura");
        }

        const subscription = await this.subscriptionProvider.getSubscription(usuario.idSubscription);

        if(usuario.idCustomer !== subscription.customer){
            throw new AppError("Assinatura não pertence ao usuário");
        }

        return subscription;
    }
}

export default RetornaAssinaturaService;
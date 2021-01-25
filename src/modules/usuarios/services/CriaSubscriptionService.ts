import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISessionProvider from '../providers/StripeProviders/SessionProvider/models/ISessionProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import Stripe from 'stripe';
import IPaymentMethodProvider from '../providers/StripeProviders/PaymentMethodProvider/models/IPaymentMethodProvider';
import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';

interface IRequest {
    idUser: string,
    paymentMethodId: string,
}

@injectable()
class CriaCustomerService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
        @inject('PaymentMethodProvider')
        private paymentMethodProvider: IPaymentMethodProvider,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
    ){}
    
    public async executar({idUser, paymentMethodId}: IRequest):Promise<void> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);
        
        if(!usuario){
            throw new AppError('Combinação de email/senha incorreta', 401);
        }

        if(!usuario.idCustomer){
            throw new AppError('Usuário não é um customer');
        } 

        const subscription = await this.subscriptionProvider.criar({
            idCustomer: usuario.idCustomer,
            paymentMethodId,
        });

        usuario.idSubscription = subscription.id;

        this.usuariosRepository.salvar(usuario);
    }
}

export default CriaCustomerService;
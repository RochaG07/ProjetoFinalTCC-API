import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import Stripe from 'stripe';

import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';
import IPremiumRepository from '../repositories/IPremiumRepository';

@injectable()
class RetornaAssinaturaService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
    ){}
    
    public async executar(idUser: string):Promise<Stripe.Subscription> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }

        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 404);
        }

        if(!premium.idSubscription){
            throw new AppError("Usuário não possui assinatura", 401);
        }

        const subscription = await this.subscriptionProvider.getSubscription(premium.idSubscription);

        if(premium.idCustomer !== subscription.customer){
            throw new AppError("Assinatura não pertence ao usuário", 401);
        }

        return subscription;
    }
}

export default RetornaAssinaturaService;
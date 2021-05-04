import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';
import IPremiumRepository from '../repositories/IPremiumRepository';
import Stripe from 'stripe';

interface IRequest {
    idUser: string,
    paymentMethodId: string,
}

@injectable()
class CriaSubscriptionService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
    ){}
    
    public async executar({idUser, paymentMethodId}: IRequest):Promise<Stripe.Subscription> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);
        
        if(!usuario){
            throw new AppError('Combinação de email/senha incorreta', 401);
        }

        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 404);
        }

        if(!premium.idCustomer){
            throw new AppError('Usuário não é um customer', 401);
        } 

        const subscription = await this.subscriptionProvider.criar({
            idCustomer: premium.idCustomer,
            paymentMethodId,
        });

        return subscription;
    }
}

export default CriaSubscriptionService;
import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IPremiumRepository from '../repositories/IPremiumRepository';
import AtribuiPaymentMethodAoCustomerService from './AtribuiPaymentMethodAoCustomerService';
import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';


interface IRequest {
    idUser: string,
    paymentMethodId: string,
}

@injectable()
class AtualizaCartaoService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
    ){}
    
    public async executar({idUser, paymentMethodId}: IRequest):Promise<void> {

        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }

        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 404);
        }
        if(!premium.idCustomer){
            throw new AppError("Premium não possui Customer", 401);
        }
        if(!premium.idSubscription){
            throw new AppError("Premium não possui Subscription", 401);
        }

        const atribuiPaymentMethodAoCustomer = container.resolve(AtribuiPaymentMethodAoCustomerService);

        await atribuiPaymentMethodAoCustomer.executar({
            paymentMethodId,
            idCustomer: premium.idCustomer,
        });

        await this.subscriptionProvider.atualizarCartao({
            paymentMethodId,
            idSubscription: premium.idSubscription
        });
    }
}

export default AtualizaCartaoService;
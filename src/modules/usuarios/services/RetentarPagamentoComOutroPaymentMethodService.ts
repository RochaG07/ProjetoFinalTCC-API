import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import AtribuiPaymentMethodAoCustomerService from './AtribuiPaymentMethodAoCustomerService';
import BuscaUltimoInvoiceDeUmaSubscriptionService from './BuscaUltimoInvoiceDeUmaSubscriptionService';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IPremiumRepository from '../repositories/IPremiumRepository';
import IInvoiceProvider from '../providers/StripeProviders/InvoiceProvider/models/IInvoiceProvider';
import Premium from '../infra/typeorm/entities/Premium';
import { fromUnixTime } from 'date-fns';
import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';


interface IRequest {
    idUser: string,
    paymentMethodId: string,
}

interface IResponse{
    premium: Premium,
}

@injectable()
class RetentarPagamentoComOutroPaymentMethodService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('InvoiceProvider')
        private invoiceProvider: IInvoiceProvider,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
    ){}
    
    public async executar({idUser, paymentMethodId}: IRequest):Promise<IResponse> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }

        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 404);
        }
        if(!premium.idCustomer){
            throw new AppError('Usuário não é um customer', 401);
        } 
        if(!premium.idSubscription){
            throw new AppError('Usuário não é possiu subscription', 401);
        } 

        const atribuiPaymentMethodAoCustomer = container.resolve(AtribuiPaymentMethodAoCustomerService);

        await atribuiPaymentMethodAoCustomer.executar({
            idCustomer: premium.idCustomer,
            paymentMethodId 
        });

        const buscaUltimoInvoiceDeUmaSubscription = container.resolve(BuscaUltimoInvoiceDeUmaSubscriptionService);

        const invoiceId = await buscaUltimoInvoiceDeUmaSubscription.executar({idSubscription: premium.idSubscription});

        console.log('invoiceId: '+ invoiceId);

        await this.invoiceProvider.pagarUmInvoice({
            invoiceId,
            paymentMethodId
        });
        const subscription = await this.subscriptionProvider.getSubscription(premium.idSubscription);

        premium.status = 'ativo';
        premium.dataExpiracao = fromUnixTime(subscription.current_period_end);
        
        await this.premiumRepository.salvar(premium);

        return {premium};
    }
}

export default RetentarPagamentoComOutroPaymentMethodService;
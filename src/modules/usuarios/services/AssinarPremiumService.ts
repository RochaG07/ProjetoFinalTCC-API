import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';

import IPremiumRepository from '../repositories/IPremiumRepository';
import Stripe from 'stripe';
import CriaCustomerService from './CriaCustomerService';
import CriaSubscriptionService from './CriaSubscriptionService';
import Premium from '../infra/typeorm/entities/Premium';
import AtribuiPaymentMethodAoCustomerService from './AtribuiPaymentMethodAoCustomerService';
import { fromUnixTime } from 'date-fns';

interface IRequest{
    idUser: string;
    paymentMethodId: string;
}

interface IResponse{
    premium: Premium,
    ultimoInvoiceId: string | Stripe.Invoice,
}

@injectable()
class AssinarPremiumService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
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

        let customer: Stripe.Customer | Stripe.DeletedCustomer;
        let subscription: Stripe.Subscription | undefined;

        if(premium.idCustomer){
            //Customer previamente existente -> Seleciona Customer


            customer = await this.customerProvider.getCustomer(premium.idCustomer);

            if(!customer){
                throw new AppError("Erro ao selecionar Customer já existente", 401);
            }
        } else {
            //Customer não existente -> Cria novo Customer

            const criaCustomer = container.resolve(CriaCustomerService);

            customer = await criaCustomer.executar(usuario.id);

            if(!customer){
                throw new AppError("Erro na criação do Customer", 401);
            }

            premium.idCustomer = customer.id;

            await this.premiumRepository.salvar(premium);
        }

        //Atribui o cartão ao customer
        const atribuiPaymentMethodAoCustomer = container.resolve(AtribuiPaymentMethodAoCustomerService);

        await atribuiPaymentMethodAoCustomer.executar({
            idCustomer: customer.id,
            paymentMethodId
        });
   

        const criaSubscription = container.resolve(CriaSubscriptionService);

        subscription = await criaSubscription.executar({
            idUser: usuario.id,
            paymentMethodId,
        });

        premium.idSubscription = subscription.id;

        if(subscription.status === 'active'){
            premium.status = 'ativo';
    
            premium.dataExpiracao = fromUnixTime(subscription.current_period_end);
        } else if(subscription.status === 'incomplete'){
            premium.status = 'pagamento-recusado';
        }

        await this.premiumRepository.salvar(premium);

        if(!subscription){
            throw new AppError("Erro na criação da Subscription", 401);
        }

        if(!subscription.latest_invoice){
            throw new AppError("Erro: Um invoice não foi gerado", 401);
        }
        
        return {
            premium,
            ultimoInvoiceId: subscription.latest_invoice
        };
    }
}

export default AssinarPremiumService;
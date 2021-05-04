import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';

interface IRequest{
    idSubscription: string;
}

@injectable()
class BuscaUltimoInvoiceDeUmaSubscriptionService{
    constructor(
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
    ){}
    
    public async executar({idSubscription}: IRequest):Promise<string> {
        const invoiceId = await this.subscriptionProvider.retornaUltimoInvoiceId(idSubscription);

        if(!invoiceId){
            throw new AppError('Invoice não encontrado', 404);
        }

        return invoiceId;
    }
}

export default BuscaUltimoInvoiceDeUmaSubscriptionService;
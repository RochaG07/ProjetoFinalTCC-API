import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';
import IPremiumRepository from '../repositories/IPremiumRepository';
import { isAfter, fromUnixTime } from 'date-fns';
import Premium from '../infra/typeorm/entities/Premium';

interface IRequest{
    dataExpiracao: Date,
    premium: Premium,
}

@injectable()
class AutenticaPremiumService{
    constructor(
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
    ){}
    
    public async executar({dataExpiracao, premium}: IRequest):Promise<void> {
        if(!premium.idSubscription){
            throw new AppError('Subscription não pode estar vazia', 401);
        }

        const dataAtual = new Date(Date.now());

        if(isAfter(dataAtual, dataExpiracao)){
            //Verifica pela API do Stripe se um novo pagamento foi feito
            //e atualiza a data de exipração 
            const subscription = await this.subscriptionProvider.getSubscription(premium.idSubscription);

            if(subscription.status === 'active'){
                premium.dataExpiracao = fromUnixTime(subscription.current_period_end);
                await this.premiumRepository.salvar(premium);  
            }
            else if(subscription.status === 'unpaid'){
                premium.status = 'pagamento-rejeitado';
                premium.dataExpiracao = undefined;
                await this.premiumRepository.salvar(premium);  
            }
        } 
    }
}

export default AutenticaPremiumService;
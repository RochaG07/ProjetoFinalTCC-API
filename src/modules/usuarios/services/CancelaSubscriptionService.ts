import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';

import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';
import IPremiumRepository from '../repositories/IPremiumRepository';

interface IRequest{
    idUser: string;
}

@injectable()
class CancelaSubscriptionService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
    ){}
    
    public async executar({idUser}: IRequest):Promise<void> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }

        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 404);
        }

        if(!premium.idSubscription){
            throw new AppError("Subscription não existe", 401);
        }

        await this.subscriptionProvider.cancelaSubscription(premium.idSubscription);

        premium.status = 'cancelado';

        this.premiumRepository.salvar(premium);
    }
}

export default CancelaSubscriptionService;
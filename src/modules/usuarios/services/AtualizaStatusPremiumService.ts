import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import Stripe from 'stripe';

import ISubscriptionProvider from '../providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';
import IPremiumRepository from '../repositories/IPremiumRepository';

interface IResponse{

}

@injectable()
class AtualizaStatusPremiumService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
    ){}
    
    public async executar(idUser: string):Promise<void> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }
        
        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 404);
        }

        

    }
}

export default AtualizaStatusPremiumService;
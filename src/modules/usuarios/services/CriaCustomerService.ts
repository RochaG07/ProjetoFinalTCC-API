import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';

import IPremiumRepository from '../repositories/IPremiumRepository';
import Stripe from 'stripe';

@injectable()
class CriaCustomerService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
    ){}
    
    public async executar(idUser: string):Promise<Stripe.Customer> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }

        const customer = await this.customerProvider.cadastrarCustomer(usuario);

        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 404);
        }

        return customer;
    }
}

export default CriaCustomerService;
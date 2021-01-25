import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISessionProvider from '../providers/StripeProviders/SessionProvider/models/ISessionProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import Stripe from 'stripe';
import IPaymentMethodProvider from '../providers/StripeProviders/PaymentMethodProvider/models/IPaymentMethodProvider';
import Usuario from '../infra/typeorm/entities/Usuario';

@injectable()
class AchaUsuarioPeloCustomerIdService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
    ){}
    
    public async executar(idUser: string):Promise<Usuario> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados");
        }

        const customer = await this.customerProvider.getCustomer(usuario.email);

        if(!customer){
            throw new AppError("CustomerId inválido");
        } 

        return usuario;
    }
}

export default AchaUsuarioPeloCustomerIdService;
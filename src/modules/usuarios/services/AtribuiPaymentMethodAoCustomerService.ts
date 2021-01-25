import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISessionProvider from '../providers/StripeProviders/SessionProvider/models/ISessionProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import Stripe from 'stripe';
import IPaymentMethodProvider from '../providers/StripeProviders/PaymentMethodProvider/models/IPaymentMethodProvider';


interface IRequest {
    idUser: string,
    paymentMethodId: string,
}

@injectable()
class AtribuiPaymentMethodAoCustomerService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
        @inject('PaymentMethodProvider')
        private paymentMethodProvider: IPaymentMethodProvider,
    ){}
    
    public async executar({idUser, paymentMethodId}: IRequest):Promise<void> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados");
        }

        if(!usuario.idCustomer){
            throw new AppError('Usuário não é um customer');
        } 

        this.paymentMethodProvider.atribuirPaymentMethodAoCustomer({
            customerId: usuario.idCustomer,
            paymentMethodId,
        })
        .then(() => {
            if(!usuario){
                throw new AppError("Somente usuarios autenticados");
            }

            this.customerProvider.tornarPaymentMethodPadrao({
                customerId: usuario.idCustomer,
                paymentMethodId,
            })
        })

    }
}

export default AtribuiPaymentMethodAoCustomerService;
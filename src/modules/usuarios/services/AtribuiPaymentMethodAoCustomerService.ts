import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import IPaymentMethodProvider from '../providers/StripeProviders/PaymentMethodProvider/models/IPaymentMethodProvider';
import IPremiumRepository from '../repositories/IPremiumRepository';


interface IRequest {
    idCustomer: string,
    paymentMethodId: string,
}

@injectable()
class AtribuiPaymentMethodAoCustomerService{
    constructor(
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
        @inject('PaymentMethodProvider')
        private paymentMethodProvider: IPaymentMethodProvider,
    ){}
    
    public async executar({paymentMethodId, idCustomer}: IRequest):Promise<void> {
        if(!idCustomer){
            throw new AppError('Usuário não é um customer', 401);
        } 

        await this.paymentMethodProvider.atribuirPaymentMethodAoCustomer({
            idCustomer,
            paymentMethodId,
        })
    
        await this.customerProvider.tornarPaymentMethodPadrao({
            idCustomer,
            paymentMethodId,
        })
    }
}

export default AtribuiPaymentMethodAoCustomerService;
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISessionProvider from '../providers/StripeProviders/SessionProvider/models/ISessionProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import Stripe from 'stripe';
import IPaymentMethodProvider from '../providers/StripeProviders/PaymentMethodProvider/models/IPaymentMethodProvider';
import Usuario from '../infra/typeorm/entities/Usuario';

/*
    1º -> Cria o customer com os dados do usuário em CriaCustomerService
    2º -> Atribui o payment method e faz a assinatura em CriaSubscriptionService

*/

@injectable()
class CriaCustomerService{
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

        const customer = await this.customerProvider.cadastrarCustomer(usuario);

        usuario.idCustomer = customer.id;

        this.usuariosRepository.salvar(usuario);

        return usuario;
    }
}

export default CriaCustomerService;
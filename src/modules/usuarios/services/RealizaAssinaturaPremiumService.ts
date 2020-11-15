import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISubscriptionProvider from '@modules/usuarios/providers/StripeProviders/SubscriptionProvider/models/ISubscriptionProvider';
import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';
import Stripe from 'stripe';
import IPaymentMethodProvider from '../providers/StripeProviders/PaymentMethodProvider/models/IPaymentMethodProvider';

interface IRequest{
    idUser: string,
    payment_method:string,
} 

@injectable()
class RealizaAssinaturaPremiumService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
        @inject('SubscriptionProvider')
        private subscriptionProvider: ISubscriptionProvider,
        @inject('PaymentMethodProvider')
        private paymentMethodProvider: IPaymentMethodProvider,
    ){}
    
    public async executar({idUser, payment_method}:IRequest):Promise<Stripe.Subscription> {
        // 1º -> Recebe como parametro a hash contendo os dados de pagamento e o id de usuário
        // 2º -> Cria o Customer
        // 3º -> Cria o Payment Method, já atribuindo o Payment Method ao Customer
        // 4º -> Cria a Subscription
        // 5º -> Cria um Payment intent ?para a subscription?
        // 6º -> 

        //Stripe secret key -> Backend charging
        //Stripe publishable key -> Frontend, help tokenize credit cards 

        const usuario = await this.usuariosRepository.acharPorId(idUser);
        
        if(!usuario){
            throw new AppError('Combinação de email/senha incorreta', 401);
        }


        /// Customer
        // Verifica se customer já existe, se não cria 
        let customer = await this.customerProvider.getCustomer(usuario.email);

        if(!customer){
            //Customer não existe
            customer = await this.customerProvider.cadastrarCustomer(usuario);
        }

        /// Payment Method
        // Atribui ao customer acima os métodos de pagamento (dados do cartão)
        await this.paymentMethodProvider.criarPaymentMethod({idCustomer: customer.id});

        /// Subscription
        const subscription = await this.subscriptionProvider.criar(customer.id);

        console.log(subscription);

        return subscription;
    }
}

export default RealizaAssinaturaPremiumService;
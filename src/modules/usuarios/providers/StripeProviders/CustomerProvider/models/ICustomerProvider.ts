import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import Stripe from "stripe";

export interface ITornarPaymentMethodPadrao{
    paymentMethodId: string,
    idCustomer: string,
}

export default interface ICustomerProvider {
    cadastrarCustomer(usuario: Usuario): Promise<Stripe.Customer>;
    getCustomer(idCustomer: string): Promise<Stripe.Customer | Stripe.DeletedCustomer>;
    tornarPaymentMethodPadrao({idCustomer, paymentMethodId}: ITornarPaymentMethodPadrao): Promise<void>;
}
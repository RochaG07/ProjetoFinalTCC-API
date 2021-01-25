import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import Stripe from "stripe";

interface ITornarPaymentMethodPadrao{
    paymentMethodId: string,
    customerId: string,
}

export default interface ICustomerProvider {
    cadastrarCustomer(usuario: Usuario): Promise<Stripe.Customer>;
    getCustomer(email: string): Promise<Stripe.Customer | undefined>;
    tornarPaymentMethodPadrao(data: ITornarPaymentMethodPadrao): Promise<void>;
}
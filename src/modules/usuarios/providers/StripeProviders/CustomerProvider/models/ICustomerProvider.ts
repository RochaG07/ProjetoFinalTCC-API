import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import Stripe from "stripe";

export default interface ICustomerProvider {
    cadastrarCustomer(usuario: Usuario): Promise<Stripe.Customer>;
    getCustomer(email: string): Promise<Stripe.Customer | undefined>;
}
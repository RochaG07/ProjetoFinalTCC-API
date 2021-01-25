import Stripe from "stripe";

export default interface ISessionProvider {
    criaSession(): Promise<Stripe.Checkout.Session>;
}
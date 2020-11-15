import Stripe from "stripe";

export default interface ISubscriptionProvider{
    criar(idCustomer: string): Promise<Stripe.Subscription>;
    verificarSeAtiva(idCustomer: string): Promise<boolean>;
}
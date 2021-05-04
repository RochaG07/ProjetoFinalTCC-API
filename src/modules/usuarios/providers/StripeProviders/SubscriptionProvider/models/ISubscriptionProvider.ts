import Stripe from "stripe";
export interface Icriar{
    idCustomer: string
    paymentMethodId: string
}
export interface Iatualizar{
    idSubscription: string
    paymentMethodId: string
}
export default interface ISubscriptionProvider{
    criar({idCustomer, paymentMethodId}: Icriar): Promise<Stripe.Subscription>;
    atualizarCartao({idSubscription, paymentMethodId}: Iatualizar): Promise<Stripe.Subscription>;
    retornaUltimoInvoiceId(idSubscription: string): Promise<string | null>;
    getSubscription(idSubscription: string): Promise<Stripe.Subscription>;
    cancelaSubscription(idSubscription: string): Promise<void>;
}
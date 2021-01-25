import Stripe from "stripe";
interface Icriar{
    idCustomer: string
    paymentMethodId: string
}
export default interface ISubscriptionProvider{
    criar({idCustomer, paymentMethodId}: Icriar): Promise<Stripe.Subscription>;
    getSubscription(subscriptionId: string): Promise<Stripe.Subscription>;
}
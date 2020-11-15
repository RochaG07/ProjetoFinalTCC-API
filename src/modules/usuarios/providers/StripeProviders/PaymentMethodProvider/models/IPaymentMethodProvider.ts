import Stripe from "stripe";
import ICriarPaymentMethodDTO from '../dtos/ICriarPaymentMethodDTO';


export default interface IPaymentMethodProvider{
    criarPaymentMethod(data: ICriarPaymentMethodDTO): Promise<Stripe.PaymentMethod>;
}
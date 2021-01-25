import Stripe from "stripe";
import { IAtribuirPaymentMethodAoCustomer } from "../dtos/IAtribuirPaymentMethodAoCustomer";

export default interface IPaymentMethodProvider{
    atribuirPaymentMethodAoCustomer(data: IAtribuirPaymentMethodAoCustomer ): Promise<void>;
}
import Stripe from "stripe";
import IPagarUmInvoiceDTO from '../dtos/IPagarUmInvoiceDTO';

export default interface IInvoiceProvider {
    pagarUmInvoice({invoiceId, paymentMethodId}: IPagarUmInvoiceDTO): Promise<Stripe.Invoice>;
    deletarUmInvoice(invoiceId: string): Promise<void>;
}
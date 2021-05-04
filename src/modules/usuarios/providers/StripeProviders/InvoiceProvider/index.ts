import { container } from 'tsyringe';

import InvoiceProvider from './implementations/InvoiceProvider';
import IInvoiceProvider from './models/IInvoiceProvider';

container.registerSingleton<IInvoiceProvider>(
    'InvoiceProvider',
    InvoiceProvider,
);
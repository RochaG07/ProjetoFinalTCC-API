import { container } from 'tsyringe';

import IPaymentMethodProvider from './models/IPaymentMethodProvider';

import PaymentMethodProvider from './implementations/PaymentMethodProvider';

container.registerSingleton<IPaymentMethodProvider>(
    'PaymentMethodProvider',
    PaymentMethodProvider,
);
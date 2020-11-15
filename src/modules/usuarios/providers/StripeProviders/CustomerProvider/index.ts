import { container } from 'tsyringe';

import ICustomerProvider from './models/ICustomerProvider';

import CustomerProvider from './implementations/CustomerProvider';

container.registerSingleton<ICustomerProvider>(
    'CustomerProvider',
    CustomerProvider,
);
import { container } from 'tsyringe';

import ISubscriptionProvider from './models/ISubscriptionProvider';

import SubscriptionProvider from './implementations/SubscriptionProvider';

container.registerSingleton<ISubscriptionProvider>(
    'SubscriptionProvider',
    SubscriptionProvider,
);
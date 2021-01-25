import { container } from 'tsyringe';

import ISessionProvider from './models/ISessionProvider';

import SessionProvider from './implementations/SessionProvider';

container.registerSingleton<ISessionProvider>(
    'SessionProvider',
    SessionProvider,
);
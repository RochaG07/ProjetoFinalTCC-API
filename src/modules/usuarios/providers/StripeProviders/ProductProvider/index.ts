import { container } from 'tsyringe';

import IProductProvider from './models/IProductProvider';

import ProductProvider from './implementations/ProductProvider';

container.registerSingleton<IProductProvider>(
    'ProductProvider',
    ProductProvider,
);
import { PRODUCT_REPOSITORY } from 'src/core/constants/index';

import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

export const ProductProviders = [
  ProductService,
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];

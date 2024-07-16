import {
  ORDER_REPOSITORY,
  PAYER_REPOSITORY,
  PRODUCT_REPOSITORY,
} from 'src/core/constants/index';
import { Order } from './entities/order.entity';
import { Payer } from '../payer/entities/payer.entity';
import { Product } from '../product/entities/product.entity';
import { OrderService } from './order.service';

export const OrderProviders = [
  OrderService,
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
  {
    provide: PAYER_REPOSITORY,
    useValue: Payer,
  },
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];

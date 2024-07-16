import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductProviders } from './product.providers';

@Module({
  controllers: [ProductController],
  providers: [...ProductProviders],
})
export class ProductModule {}

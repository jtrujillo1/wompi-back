import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core';
import { Product } from './entities/product.entity';
import { Stock } from '../stock/entities/stock.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  getProducts() {
    return this.productRepository.findAll({
      attributes: { exclude: ['productId'] },
      where: { status: 2 },
      include: { model: Stock, as: 'stock' },
    });
  }
}

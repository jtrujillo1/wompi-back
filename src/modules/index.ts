import type { Sequelize } from 'sequelize';
import { Delivery } from './delivery/entities/delivery.entity';
import { Order } from './order/entities/order.entity';
import { OrderProduct } from './orderProduct/entities/orderProduct.entity';
import { Payer } from './payer/entities/payer.entity';
import { Payment } from './payment/entities/payment.entity';
import { Product } from './product/entities/product.entity';
import { Stock } from './stock/entities/stock.entity';

export { Order, Payment, Product, Stock, OrderProduct, Payer, Delivery };

export function initModels(sequelize: Sequelize) {
  Order.initModel(sequelize);
  Payment.initModel(sequelize);
  Product.initModel(sequelize);
  Stock.initModel(sequelize);
  OrderProduct.initModel(sequelize);
  Payer.initModel(sequelize);
  Delivery.initModel(sequelize);

  Order.belongsToMany(Product, {
    as: 'products',
    through: OrderProduct,
    foreignKey: 'product_id',
    otherKey: 'order_id',
    onDelete: 'CASCADE',
  });
  Order.belongsTo(Payment, {
    as: 'payment',
    foreignKey: 'payment_id',
  });
  Order.belongsTo(Payer, {
    as: 'payer',
    foreignKey: 'payer_id',
  });
  Product.belongsTo(Stock, {
    as: 'stock',
    foreignKey: 'product_id',
  });
  Payer.hasMany(Delivery, {
    as: 'deliveries',
    foreignKey: 'payer_id',
  });

  return {
    Order,
    Payment,
    Product,
    Stock,
    OrderProduct,
    Payer,
    Delivery,
  };
}

import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { Payer } from 'src/modules/payer/entities/payer.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Product } from 'src/modules/product/entities/product.entity';

type OrderAssociations = 'products' | 'payment' | 'payer';

export class Order extends Model<
  InferAttributes<Order, { omit: OrderAssociations }>,
  InferCreationAttributes<Order, { omit: OrderAssociations }>
> {
  declare id: CreationOptional<string>;
  declare cur: string;
  declare paymentId: string;
  declare status: number;
  declare payerId: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Order belongsToMany Product (as Products)
  declare products?: NonAttribute<Product[]>;
  declare getProducts: BelongsToManyGetAssociationsMixin<Product>;
  declare setProducts: BelongsToManySetAssociationsMixin<Product, string>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, string>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, string>;
  declare createProduct: BelongsToManyCreateAssociationMixin<Product>;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<Product, string>;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<Product, string>;
  declare hasProduct: BelongsToManyHasAssociationMixin<Product, string>;
  declare hasProducts: BelongsToManyHasAssociationsMixin<Product, string>;
  declare countProducts: BelongsToManyCountAssociationsMixin;

  // Order belongsTo Payment (as Payment)
  declare payment?: NonAttribute<Payment>;
  declare getPayment: BelongsToGetAssociationMixin<Payment>;
  declare setPayment: BelongsToSetAssociationMixin<Payment, string>;
  declare createPayment: BelongsToCreateAssociationMixin<Payment>;

  // Order belongsTo Payer
  declare payer?: NonAttribute<Payer>;
  declare getPayer: BelongsToGetAssociationMixin<Payer>;
  declare setPayer: BelongsToSetAssociationMixin<Payer, string>;
  declare createPayer: BelongsToCreateAssociationMixin<Payer>;

  declare static associations: {
    products: Association<Order, Product>;
    payment: Association<Order, Payment>;
    payer: Association<Order, Payer>;
  };

  static initModel(sequelize: Sequelize): typeof Order {
    Order.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        cur: {
          type: DataTypes.STRING(32),
          allowNull: false,
          unique: true,
        },
        paymentId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        payerId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      },
    );

    return Order;
  }
}

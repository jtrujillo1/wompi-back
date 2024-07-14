import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { Stock } from 'src/modules/stock/entities/stock.entity';


type ProductAssociations = 'stock';

export class Product extends Model<
  InferAttributes<Product, { omit: ProductAssociations }>,
  InferCreationAttributes<Product, { omit: ProductAssociations }>
> {
  declare id: CreationOptional<string>;
  declare status: number;
  declare name: string;
  declare price: number;
  declare description: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Product belongsTo Stock (as Stock)
  declare stock?: NonAttribute<Stock>;
  declare getStock: BelongsToGetAssociationMixin<Stock>;
  declare setStock: BelongsToSetAssociationMixin<Stock, never>;
  declare createStock: BelongsToCreateAssociationMixin<Stock>;

  declare static associations: {
    stock: Association<Product, Stock>;
  };

  static initModel(sequelize: Sequelize): typeof Product {
    Product.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(100),
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

    return Product;
  }
}

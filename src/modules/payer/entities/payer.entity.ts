import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';

type PayerAssociations = 'deliveries';

export class Payer extends Model<
  InferAttributes<Payer, { omit: PayerAssociations }>,
  InferCreationAttributes<Payer, { omit: PayerAssociations }>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare status: number;
  declare address: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Payer hasMany Delivery (as Deliveries)
  declare deliveries?: NonAttribute<Delivery[]>;
  declare getDeliveries: HasManyGetAssociationsMixin<Delivery>;
  declare setDeliveries: HasManySetAssociationsMixin<Delivery, never>;
  declare addDelivery: HasManyAddAssociationMixin<Delivery, never>;
  declare addDeliveries: HasManyAddAssociationsMixin<Delivery, never>;
  declare createDelivery: HasManyCreateAssociationMixin<Delivery, 'payerId'>;
  declare removeDelivery: HasManyRemoveAssociationMixin<Delivery, never>;
  declare removeDeliveries: HasManyRemoveAssociationsMixin<Delivery, never>;
  declare hasDelivery: HasManyHasAssociationMixin<Delivery, never>;
  declare hasDeliveries: HasManyHasAssociationsMixin<Delivery, never>;
  declare countDeliveries: HasManyCountAssociationsMixin;

  declare static associations: {
    deliveries: Association<Payer, Delivery>;
  };

  static initModel(sequelize: Sequelize): typeof Payer {
    Payer.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(100),
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

    return Payer;
  }
}

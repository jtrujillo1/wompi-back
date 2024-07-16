import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Delivery extends Model<
  InferAttributes<Delivery>,
  InferCreationAttributes<Delivery>
> {
  declare id: CreationOptional<string>;
  declare payerId: CreationOptional<string>;
  declare status: number;
  declare address: string;
  declare city: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Delivery {
    Delivery.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        payerId: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
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

    return Delivery;
  }
}

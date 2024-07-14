import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { initModels } from 'src/modules';
import { SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const { username, database, password, ...options } =
        databaseConfig(configService);
      const sequelize = new Sequelize(
        database,
        username,
        password,
        options as any,
      );
      initModels(sequelize);
      await sequelize.sync();
      return sequelize;
    },
  },
];

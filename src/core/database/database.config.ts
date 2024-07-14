import { ConfigService } from '@nestjs/config';
import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';

export function databaseConfig(
  configService: ConfigService,
): IDatabaseConfigAttributes {
  return {
    username: configService.get<string>('DB_USER') || 'PLEASE CONFIGURE',
    password: configService.get<string>('DB_PASS') || '',
    database: configService.get<string>('DB_NAME') || '',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: configService.get<string>('DB_PORT') || '5432',
    dialect: 'postgres',
  };
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentSchema } from './core/validators/environment.scheme';
import { ConsoleModule } from './core/console/console.module';
import { DatabaseModule } from './core/database/database.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvironmentSchema,
    }),
    ConsoleModule,
    DatabaseModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

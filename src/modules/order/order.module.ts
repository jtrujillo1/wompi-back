import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderProviders } from './order.providers';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [...OrderProviders],
})
export class OrderModule {}

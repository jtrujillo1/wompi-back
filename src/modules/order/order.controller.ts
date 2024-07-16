import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { TransactionParam } from 'src/core/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { UpdateOrderDTO } from './dto/update-order';
import { TransactionInterceptor } from 'src/core';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('preorder')
  @UseInterceptors(TransactionInterceptor)
  preOrder(
    @TransactionParam() transaction: Transaction,
    @Body() createOrderDTO: any,
  ) {
    return this.orderService.preOrder(createOrderDTO, transaction);
  }

  @Post('updateorder')
  @UseInterceptors(TransactionInterceptor)
  updateOrder(
    @Body() updateOrderDTO: UpdateOrderDTO,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.orderService.updateOrder(updateOrderDTO, transaction);
  }
}

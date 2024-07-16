import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  PAYER_REPOSITORY,
  PRODUCT_REPOSITORY,
} from 'src/core/constants';
import { Order } from './entities/order.entity';
import { Transaction } from 'sequelize';
import { UpdateOrderDTO } from './dto/update-order';
import { typeStatus } from './enum/status-order';
import { Payer } from '../payer/entities/payer.entity';
import { PayerStatus } from '../payer/enums/status.enum';
import { Product } from '../product/entities/product.entity';
import { Delivery } from '../delivery/entities/delivery.entity';
import { Payment } from '../payment/entities/payment.entity';
import { OrderProduct } from '../orderProduct/entities/orderProduct.entity';
import { ConfigService } from '@nestjs/config';
import { sha256 } from 'js-sha256';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: typeof Order,
    @Inject(PAYER_REPOSITORY)
    private readonly payerRepository: typeof Payer,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    private readonly configService: ConfigService,
  ) {}

  preOrder(createOrderDto: any, transaction: Transaction) {
    const {
      product,
      payer: { email },
      delivery,
    } = createOrderDto;
    // se crea un pagador con su dirección ingresada
    return this.payerRepository
      .findOrCreate({
        where: { email },
        defaults: {
          ...createOrderDto.payer,
          status: PayerStatus.Active,
          delivery,
        },
        include: [
          {
            model: Delivery,
            as: 'deliveries',
          },
        ],
        transaction,
      })
      .then(([payer, created]) => {
        // se obtiene un código de referencia para el pago
        return this.createCur().then((cur) => {
          // se busca los productos y sus precios reales seleccionados por el pagador
          return this.productRepository
            .findAll({
              where: { id: product, status: 2 },
              attributes: ['id', 'price'],
            })
            .then((findProducts) => {
              // se suma el calor total a pagar
              let amount: number = 0;
              findProducts.map((findProduct) => {
                amount += findProduct.price;
              });
              // se crea una pre-orden que conoce el valor real a pagar
              const order = {
                cur,
                products: findProducts,
                payment: { amount, status: 2, paymentMethod: 'CARD' },
                payerId: payer.id,
                status: 2,
              };
              return this.orderRepository
                .create(order as any, {
                  include: [
                    {
                      model: Payment,
                      as: 'payment',
                    },
                    {
                      model: OrderProduct,
                      as: 'products',
                    },
                  ],
                })
                .then((order) => {
                  //*valor de cadena: <Referencia><Monto><Moneda><FechaExpiracion><SecretoIntegridad>

                  const cadenaConcatenada = String.prototype.concat(
                    order.cur,
                    (amount * 100).toString(),
                    'COP',
                    this.configService.get<string>(
                      'API_KEY_INTEGRITY_WOMPI',
                    ) as string,
                  );

                  const hashHex = sha256.hex(cadenaConcatenada);
                  const preOrder = {
                    cur: order.cur,
                    planAmounts: amount,
                    integrity: hashHex,
                  };

                  return preOrder;
                });
            });
        });
      });
  }

  updateOrder(updateOrderDTO: UpdateOrderDTO, transaction: Transaction) {
    // if (updateOrderDTO.data.transaction) {
    //   const resStatus = parseInt(
    //     typeStatus[updateOrderDTO.data.transaction.status],
    //   );
    //   const resWompi = updateOrderDTO.data.transaction;
    //   //*Se realizan consultas una order buscandola por el cur
    //   return this.orderRepository
    //     .findOne({
    //       where: { cur: updateOrderDTO.data.transaction.reference },
    //       include: [
    //         {
    //           model: Subscription,
    //           as: 'subscription',
    //           include: [
    //             { model: Plan, as: 'plan' },
    //             { model: Discount, as: 'Discount' },
    //           ],
    //         },
    //         {
    //           required: false,
    //           model: Payer,
    //           as: 'payer',
    //           include: [{ model: ClientInvoce, as: 'clientinvoice' }],
    //         },
    //         {
    //           model: Account,
    //           as: 'account',
    //           include: [
    //             {
    //               model: ClientInvoce,
    //               as: 'clientinvoice',
    //             },
    //           ],
    //         },
    //         { model: Payment, as: 'payment' },
    //       ],
    //     })
    //     .then((order) => {
    //       if (resWompi.amount_in_cents / 100 >= order.payment.amountInCents) {
    //         //*Se realizan actualizacion de datos solo si el monto es igual o superior al de payment
    //         return order.payment
    //           .update(
    //             {
    //               amountInCents: resWompi.amount_in_cents / 100,
    //               paymentMethod: resWompi.payment_method_type,
    //               currency: resWompi.currency,
    //               status: resStatus,
    //               transactionDate: moment(updateOrderDTO.sent_at).format(
    //                 'YYYY-MM-DD HH:mm',
    //               ),
    //             },
    //             { transaction },
    //           )
    //           .then(() => {
    //             //*Se realizan actualizacion el estado de order status solo 2 solo si la resuesta de wompi es exitosa y status 1 para cualquier otra eventualidad
    //             if (resStatus == 2) {
    //               return order.update({ status: 2 }, { transaction });
    //             } else {
    //               return order.update({ status: 1 }, { transaction });
    //             }
    //           })
    //           .then((order) => {
    //             console.log(`Status de orden: ${order.status}`);
    //             if (resStatus == 2) {
    //               //*Se Inicia el proceso de generar cliente en alegra para posteriomente generar factura electronica
    //               if (order.payer) {
    //                 if (!order.payer.clientinvoice) {
    //                   return this.createClient(order, transaction).then(
    //                     (clientId) => {
    //                       console.log('createClient', clientId);
    //                       return { order, clientId };
    //                     },
    //                   );
    //                 } else {
    //                   return {
    //                     order,
    //                     clientId: order.payer.clientinvoice.clientId,
    //                   };
    //                 }
    //               } else {
    //                 if (!order.account.clientinvoice) {
    //                   return this.createClient(order, transaction).then(
    //                     (clientId) => {
    //                       console.log('createClient', clientId);
    //                       return { order, clientId };
    //                     },
    //                   );
    //                 } else {
    //                   return {
    //                     order,
    //                     clientId: order.account.clientinvoice.clientId,
    //                   };
    //                 }
    //               }
    //             }
    //           })
    //           .catch((res) => {
    //             console.log(res);
    //           });
    //       } else {
    //         console.log('Monto inferior al de payment');
    //         return;
    //       }
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //     })
    //     .then((order: any) => {
    //       //*Una vez se obtenga el cliente se procede a generar la factura
    //       if (order) {
    //         if (
    //           resWompi.amount_in_cents / 100 >=
    //           order.order.payment.amountInCents
    //         ) {
    //           return this.createInvoice(
    //             order.clientId,
    //             order.order.subscription,
    //             order.order,
    //             transaction,
    //           )
    //             .catch((err) => {
    //               console.log(err);
    //             })
    //             .then((invoice) => {
    //               return this.sendInvoice(order.order, invoice.invoceCode)
    //                 .then(() => {
    //                   return;
    //                 })
    //                 .catch((err) => {
    //                   console.log(err);
    //                   return;
    //                 });
    //             })
    //             .then(() => {
    //               return order.order.subscription.update(
    //                 { status: 2 },
    //                 { transaction },
    //               );
    //               // });
    //               // .then(() => {
    //               //   return this.orderRepository
    //               //     .findAll({
    //               //       where: {
    //               //         status: 2,
    //               //         cur: {
    //               //           [Op.not]: updateOrderDTO.data.transaction.reference,
    //               //         },
    //               //       },
    //               //       include: [
    //               //         {
    //               //           model: Account,
    //               //           as: 'account',
    //               //           where: { status: 2 },
    //               //           include: [
    //               //             {
    //               //               model: Subscription,
    //               //               as: 'subscription',
    //               //               where: { status: 2 },
    //               //             },
    //               //           ],
    //               //         },
    //               //       ],
    //               //     })
    //               //     .then((res: any) => {
    //               //       if (resStatus == 2) {
    //               //         const allStatus = res.map(async (resS) => {
    //               //           await resS.account.subscription.update(
    //               //             { status: 1 },
    //               //             { transaction },
    //               //           );
    //               //         });
    //               //         return Promise.all(allStatus);
    //               //       }
    //               //     });
    //             });
    //         } else {
    //           console.log('valores diferentes');
    //         }
    //       } else {
    //         console.log('No hay orden');
    //         return;
    //       }
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //     });
    // } else {
    //   console.log('No es una transacción');
    //   return;
    // }
  }

  //* metodo que crea una referencia de pago
  private async createCur(): Promise<string> {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 21; i++) {
      if (i == 5) {
        result += '-';
      }
      if (i == 10) {
        result += '-';
      }
      if (i == 15) {
        result += '-';
      } else {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
    }
    const resu = await this.orderRepository.findOne({
      where: {
        cur: result,
      },
    });
    if (resu) {
      this.createCur();
    } else {
      return result;
    }
  }
}

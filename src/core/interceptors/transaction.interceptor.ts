import {
  Injectable,
  NestInterceptor,
  Inject,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../constants';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelizeInstance: Sequelize,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const transaction: Transaction = await this.sequelizeInstance.transaction();
    req.transaction = transaction;
    //console.log('interceptor: Inicia Transaccion');
    return next.handle().pipe(
      tap(async () => {
        await transaction.commit();
        // console.log('interceptor: Finaliza Transaccion');
      }),
      catchError(async (err) => {
        await transaction.rollback();
        //console.log('interceptor: Finaliza Transaccion');
        console.log(err);
        throw err;

        /*return throwError(() => {
          throw err;
          //new Error(err);
        });*/
      }),
    );
  }
}

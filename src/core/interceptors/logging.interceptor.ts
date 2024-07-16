import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { ConsoleService } from '../console/console.service';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private consoleService: ConsoleService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.consoleService.requestStatus(
          context.getArgs()[0].method,
          context.getArgs()[0].url,
          context.getArgs()[1].statusCode,
          Date.now() - now,
        );
      }),
      catchError((err) => {
        console.log(err);
        this.consoleService.requestStatus(
          context.getArgs()[0].method,
          context.getArgs()[0].url,
          err.status,
          Date.now() - now,
        );
        throw err;
      }),
    );
  }
}

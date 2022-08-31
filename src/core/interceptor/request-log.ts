import { tap } from 'rxjs';
import { Logger } from '@vodyani/winston';
import { AsyncInject, Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@vodyani/core';

import { HTTP_HEADER, uuid } from '../common';

import { LoggerManager } from '@/infrastructure/logger/manager';

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  constructor(
    @AsyncInject(LoggerManager) private readonly logger: Logger,
  ) {}

  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const { originalUrl, body, query, method, headers } = ctx.switchToHttp().getRequest();

    headers[HTTP_HEADER.RID] = headers[HTTP_HEADER.RID] || uuid();

    return next.handle().pipe(tap(result => {
      this.logger.info(
        { originalUrl, method, query, body, headers },
        `${ctx.getClass().name}.${ctx.getHandler().name}`,
      );

      return result;
    }));
  }
}

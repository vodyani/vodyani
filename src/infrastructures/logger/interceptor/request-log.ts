import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { AsyncInject } from '@vodyani/core';
import { Logger } from '@vodyani/winston';
import { tap } from 'rxjs';

import { LoggerManager } from '../manager';

import { HTTP_HEADER, uuid } from '@/core/common';

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  constructor(
    @AsyncInject(LoggerManager) private readonly logger: Logger,
  ) {}

  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const { originalUrl, body, query, method, headers } = ctx.switchToHttp().getRequest();

    headers[HTTP_HEADER.REQUEST_ID] = headers[HTTP_HEADER.REQUEST_ID] || uuid();

    return next.handle().pipe(tap(result => {
      this.logger.info(
        { originalUrl, method, query, body, headers },
        `${ctx.getClass().name}.${ctx.getHandler().name}`,
      );

      return result;
    }));
  }
}

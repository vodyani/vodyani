import { Logger } from '@vodyani/winston';
import { AsyncInject, Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@vodyani/core';

import { resultIntercept } from '../method';
import { HTTP_HEADER, uuid, Req } from '../common';

import { LoggerManager } from '@/infrastructure/logger/manager';

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  constructor(
    @AsyncInject(LoggerManager) private readonly logger: Logger,
  ) {}

  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const request: Req = ctx.switchToHttp().getRequest();
    const { originalUrl, body, query, method, headers } = request;
    request.headers[HTTP_HEADER.RID] = headers[HTTP_HEADER.RID] || uuid();

    return resultIntercept(next, () => {
      this.logger.info(
        {
          request: { originalUrl, method, headers, query, body },
          handler: ctx.getHandler().name,
          class: ctx.getClass().name,
        },
        `${ctx.getClass().name}.${ctx.getHandler().name}`,
      );
    });
  }
}

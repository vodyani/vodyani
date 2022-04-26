import { Request } from 'express';
import { BaseLogger } from '@vodyani/winston';
import { convert } from '@vodyani/transformer';
import { Injectable, NestInterceptor, Inject, ExecutionContext, CallHandler } from '@nestjs/common';

import { resultIntercept } from '../method';
import { HTTP_HEADER, ResponseBody, uuid } from '../common';

import { LoggerManager } from '@/infrastructure/logger/manager';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(
    @Inject(LoggerManager.token)
    private readonly logger: BaseLogger,
  ) {}

  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const request: Request = ctx.switchToHttp().getRequest();
    const { originalUrl, body, query, method, headers } = request;

    request.headers[HTTP_HEADER.RID] = convert(headers[HTTP_HEADER.RID], uuid());

    return resultIntercept(next, (responseBody: ResponseBody<Record<string, any>>) => {
      this.logger.info(
        {
          request: { originalUrl, method, headers, query, body },
          handler: ctx.getHandler().name,
          class: ctx.getClass().name,
        },
        `${ctx.getClass().name}.${ctx.getHandler().name}`,
      );

      return responseBody;
    });
  }
}

import { Request, Response } from 'express';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { responseIntercept } from '../method';

import { HTTP_HEADER, httpStatus } from '@/core/common';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const requestTime = Date.now();
    const request: Request = ctx.switchToHttp().getRequest();
    const response: Response = ctx.switchToHttp().getResponse();
    const requestId = request.headers[HTTP_HEADER.RID];

    return responseIntercept(next, (body: any) => {
      const status = httpStatus.get(response.statusCode);

      const data = body || {};
      const code = status.code;
      const message = status.message;
      const responseTime = Date.now();
      return { code, message, requestId, requestTime, responseTime, data };
    });
  }
}


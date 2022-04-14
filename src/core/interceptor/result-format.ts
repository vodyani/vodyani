import { Request, Response } from 'express';
import { isBuffer, isArrayBuffer } from 'lodash';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { isValidStream, getDefault, getDefaultString, resultIntercept } from '@vodyani/core';

import { HTTP_HEADER, httpStatus } from '@/core/common';

@Injectable()
export class ResultFormatInterceptor implements NestInterceptor {
  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const requestTime = Date.now();

    return resultIntercept(next, (body: any) => {
      if (isValidStream(body) || isBuffer(body) || isArrayBuffer(body)) {
        return body;
      }

      const request: Request = ctx.switchToHttp().getRequest();
      const response: Response = ctx.switchToHttp().getResponse();
      const requestId = getDefaultString(request.headers[HTTP_HEADER.RID]);

      const result = httpStatus.get(response.statusCode);

      const code = result.code;
      const responseTime = Date.now();
      const data = getDefault(body, {});
      const message = getDefaultString(result.message);
      return { code, message, requestId, requestTime, responseTime, data };
    });
  }
}


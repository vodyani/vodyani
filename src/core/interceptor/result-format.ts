import { Request, Response } from 'express';
import { isBuffer, isArrayBuffer } from 'lodash';
import { isValidStream } from '@vodyani/validator';
import { convert, convertString } from '@vodyani/transformer';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { resultIntercept } from '../method';
import { HTTP_HEADER, httpStatus } from '../common';

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
      const requestId = convertString(request.headers[HTTP_HEADER.RID]);

      const result = httpStatus.get(response.statusCode);

      const code = result.code;
      const responseTime = Date.now();
      const data = convert(body, {});
      const message = convertString(result.message);
      return { code, message, requestId, requestTime, responseTime, data };
    });
  }
}


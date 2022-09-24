import { map } from 'rxjs';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { isStreamableFile } from '@/core/method';
import { HTTP_HEADER, httpStatus, HTTP_STATUS } from '@/core/common';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const requestTime = Date.now();
    const requestId = ctx.switchToHttp().getRequest().headers[HTTP_HEADER.RID];

    return next.handle().pipe(map(result => {
      if (isStreamableFile(result)) return result;

      const statusCode = ctx.switchToHttp().getResponse().statusCode;
      const status = httpStatus.get(statusCode);

      const data = result || {};
      const responseTime = Date.now();
      const message = status.message || '';
      const code = status.code || HTTP_STATUS.BAD_SERVER;
      return { code, message, requestId, requestTime, responseTime, data };
    }));
  }
}


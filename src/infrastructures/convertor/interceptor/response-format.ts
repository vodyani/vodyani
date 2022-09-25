import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

import { httpStatus, HTTP_HEADER, HTTP_STATUS, Req, Res } from '@/core/common';
import { isStreamableFile } from '@/core/method';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  public intercept(ctx: ExecutionContext, next: CallHandler) {
    const requestTime = Date.now();
    const requestId = ctx.switchToHttp().getRequest<Req>().headers[HTTP_HEADER.RID];

    return next.handle().pipe(map(result => {
      if (isStreamableFile(result)) return result;

      const res = ctx.switchToHttp().getResponse<Res>();

      // Resolved where `POST` defaults to 201.
      if (res.statusCode === HTTP_STATUS.CREATED) {
        res.statusCode = HTTP_STATUS.SUCCESS;
      }

      const status = httpStatus.get(res.statusCode);

      const data = result || {};
      const responseTime = Date.now();
      const message = status.message || '';
      const code = status.code || HTTP_STATUS.BAD_SERVER;

      return { code, message, requestId, requestTime, responseTime, data };
    }));
  }
}


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { httpStatusMap, HTTP_HEADER, IResponseBody } from '@/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class ParamFormatInterceptor implements NestInterceptor {
  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<IResponseBody<any>> {
    const requestTime = Date.now();

    return next.handle().pipe(map((body: Record<string, any>) => {
      const request: Request = ctx.switchToHttp().getRequest();
      const response: Response = ctx.switchToHttp().getResponse();
      const requestId = (request.headers[HTTP_HEADER.REQUEST_ID] as string);
      const contentType = request.headers['content-type'] || 'application/json; charset=utf-8';

      if (
        contentType.includes('application/json') ||
        contentType.includes('application/x-www-form-urlencoded')
      ) {
        const httpStatus = httpStatusMap.get(response.statusCode);

        const data = body || {};
        const code = httpStatus.code;
        const responseTime = Date.now();
        const message = httpStatus.message || '';

        return { code, message, requestId, requestTime, responseTime, data };
      }

      return body;
    }));
  }
}

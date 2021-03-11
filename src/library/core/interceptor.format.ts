import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { ResponseBody, headersConstant, httpStatusConstant, HttpStatusConstant } from '@common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

/**
 * Formatting response body
 *
 * @see: [interceptors](https://docs.nestjs.com/interceptors)
 */
@Injectable()
export class FormatInterceptor implements NestInterceptor {
  private readonly options: HttpStatusConstant = httpStatusConstant

  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<ResponseBody<any>> {
    return next.handle().pipe(map((details: any) => {
      const request: Request = ctx.switchToHttp().getRequest();
      const response: Response = ctx.switchToHttp().getResponse();
      const requestId = (request.headers[headersConstant.requestId] as string);
      const contentType = request.headers['content-type'] || 'application/json; charset=utf-8';

      /**
       * only deal json & x-www-form-urlencoded
       */
      if (
        contentType.includes('application/json') ||
        contentType.includes('application/x-www-form-urlencoded')
      ) {
        const status = this.options.status.get(response.statusCode);

        const data = details || null;
        const timestamp = Date.now();
        const errorCode = status.errorCode || 0;
        const code = status.code || response.statusCode;
        const message = status[this.options.language] || '';

        return { requestId, code, errorCode, message, timestamp, data };
      }

      return details;
    }));
  }
}

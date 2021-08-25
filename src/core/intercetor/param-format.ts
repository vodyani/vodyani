import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { httpStatusMap, HTTP_HEADER, IHttpResponseBody } from '@/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

/** 拦截器 —— 用于格式化 response body */
@Injectable()
export class ParamFormatInterceptor implements NestInterceptor {
  /** 覆盖 NestInterceptor intercept */
  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<IHttpResponseBody<any>> {
    const requestTime = Date.now();

    return next.handle().pipe(map((details: any) => {
      /** 获取请求中的基础信息 */
      const request: Request = ctx.switchToHttp().getRequest();
      const response: Response = ctx.switchToHttp().getResponse();
      const requestId = (request.headers[HTTP_HEADER.REQUEST_ID] as string);
      const contentType = request.headers['content-type'] || 'application/json; charset=utf-8';

      /** 只对类型为 `json` 或 `x-www-form-urlencoded` 的请求进行格式化处理 */
      if (
        contentType.includes('application/json') ||
        contentType.includes('application/x-www-form-urlencoded')
      ) {
        const httpStatus = httpStatusMap.get(response.statusCode);

        const data = details || {};
        const code = httpStatus.code;
        const responseTime = Date.now();
        const message = httpStatus.message || '';

        return { code, message, requestId, requestTime, responseTime, data };
      }

      return details;
    }));
  }
}

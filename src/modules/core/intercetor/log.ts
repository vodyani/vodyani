import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { map } from 'rxjs/operators';
import { WinstonLoggerProvider } from '@/extends/logger';
import { HTTP_HEADER, IHttpResponseBody } from '@/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

/** 拦截器 —— 用于处理日志记录 */
@Injectable()
export class LogInterceptor implements NestInterceptor {
  /** 注入日志提供者 */
  constructor(
    private readonly logger: WinstonLoggerProvider
  ) {}

  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    /** 获取请求中的基础信息 */
    const req: Request = ctx.switchToHttp().getRequest();
    const { originalUrl, body, query, method, headers } = req;
    headers[HTTP_HEADER.REQUEST_ID] = headers[HTTP_HEADER.REQUEST_ID] || uuid();

    /** 定义日志内容 */
    const content = JSON.stringify({
      type: 'REQUEST_ID',
      class: ctx.getClass().name,
      handle: ctx.getHandler().name,
      request: { originalUrl, method, headers, query, body },
    });

    /** 打印 REQUEST_ID LOG */
    this.logger.info(content);

    /** 绑定执行过程 */
    return next.handle().pipe(
      map((response: IHttpResponseBody<Record<string, any>>) => {
        const content = JSON.stringify({ type: 'REQUEST_SUCCESS', response });
        this.logger.info(content);
        return response;
      }),
    );
  }
}

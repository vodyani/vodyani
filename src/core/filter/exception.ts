import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { WinstonLoggerProvider } from '@/extends/logger';
import { httpStatusMap, HTTP_HEADER, IHttpResponseBody } from '@/common';
import { ArgumentsHost, Catch, ExceptionFilter as Filter, HttpException } from '@nestjs/common';

/** 过滤器 —— 用于捕捉异常和异常日志记录 */
@Catch()
export class ExceptionFilter implements Filter {
  /** 注入日志提供者 */
  constructor(private readonly logger: WinstonLoggerProvider) {}

  public catch(exception: HttpException, host: ArgumentsHost) {
    /** 获取请求中的基础信息 */
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();
    const { originalUrl, body, query, method, headers } = req;

    /** 获取当前的异常状态码 */
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;

    /** 查找异常常量中的定义 */
    const httpStatus = httpStatusMap.get(statusCode);

    /** 定义异常日志内容 */
    const response: IHttpResponseBody<Record<string, any>> = {
      data: {},
      code: httpStatus.code,
      requestTime: Date.now(),
      responseTime: Date.now(),
      message: httpStatus.message,
      requestId: req.headers[HTTP_HEADER.REQUEST_ID] as string || uuid(),
    };

    /** 打印异常日志 */
    this.logger.error(
      JSON.stringify({
        type: 'ERROR',
        request: { originalUrl, method, headers, query, body },
        response,
        exception,
      }),
    );

    /** 抛出异常 */
    res.status(httpStatus.statusCode);
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(response);
  }
}

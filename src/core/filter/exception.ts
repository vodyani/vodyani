import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { httpStatusMap, HTTP_HEADER } from '@/common';
import { WinstonLoggerProvider } from '@/extends/logger';
import { ArgumentsHost, Catch, ExceptionFilter as Filter, HttpException } from '@nestjs/common';

@Catch()
export class ExceptionFilter implements Filter {
  constructor(
    private readonly logger: WinstonLoggerProvider
  ) {}

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { originalUrl, body, query, method, headers } = request;

    /** 匹配常量中的定义 */
    const httpStatus = httpStatusMap.get(
      exception instanceof HttpException ? exception.getStatus() : 500,
    );

    /** 打印异常日志 */
    this.logger.error(
      'ExceptionFilter',
      {
        type: 'ERROR',
        exception,
        request: { originalUrl, method, headers, query, body },
        response: {
          data: {},
          code: httpStatus.code,
          requestTime: Date.now(),
          responseTime: Date.now(),
          message: exception.message || httpStatus.message,
          requestId: headers[HTTP_HEADER.REQUEST_ID] as string || uuid(),
        },
      },
    );

    /** 抛出异常 */
    response.status(httpStatus.statusCode);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(response);
  }
}

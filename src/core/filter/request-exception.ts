import { Request, Response } from 'express';
import { BaseLogger } from '@vodyani/winston';
import { convert, toDeepSnakeCase } from '@vodyani/transformer';
import { Catch, Inject, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

import { httpStatus, HTTP_HEADER, uuid } from '../common';

import { LoggerManager } from '@/infrastructure/logger/manager';

@Catch()
export class RequestExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerManager.token)
    private readonly logger: BaseLogger,
  ) {}

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { originalUrl, body, query, method, headers } = request;

    const result = httpStatus.get(
      exception instanceof HttpException ? exception.getStatus() : 500,
    );

    const responseBody = {
      data: {},
      code: result.code,
      requestTime: Date.now(),
      responseTime: Date.now(),
      message: convert(exception.message, result.message),
      requestId: convert(headers[HTTP_HEADER.RID], uuid()),
    };

    this.logger.error(
      exception,
      'ExceptionFilter',
      {
        request: { originalUrl, method, headers, query, body },
        response: responseBody,
      },
    );

    response
      .status(result.statusCode)
      .json(toDeepSnakeCase(responseBody));
  }
}

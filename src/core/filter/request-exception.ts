import { Logger } from '@vodyani/winston';
import { Request, Response } from 'express';
import { AsyncInject } from '@vodyani/core';
import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

import { toDeepSnakeCase } from '../method';
import { httpStatus, HTTP_HEADER, uuid } from '../common';

import { LoggerManager } from '@/infrastructure/logger/manager';

@Catch()
export class RequestExceptionFilter implements ExceptionFilter {
  constructor(
    @AsyncInject(LoggerManager) private readonly logger: Logger,
  ) {}

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { originalUrl, body, query, method, headers } = request;

    const result = httpStatus.get(
      exception instanceof HttpException ? exception.getStatus() : 400,
    );

    const responseBody = {
      data: {},
      code: result.code,
      requestTime: Date.now(),
      responseTime: Date.now(),
      message: exception.message || result.message,
      requestId: headers[HTTP_HEADER.RID] || uuid(),
    };

    this.logger.error(
      exception,
      {
        request: { originalUrl, method, headers, query, body },
        response: responseBody,
      },
      'ExceptionFilter',
    );

    response
      .status(result.statusCode)
      .json(toDeepSnakeCase(responseBody));
  }
}

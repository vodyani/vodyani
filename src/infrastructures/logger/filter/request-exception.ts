import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { AsyncInject } from '@vodyani/core';
import { Logger } from '@vodyani/winston';

import { LoggerManager } from '../manager';

import { httpStatus, HTTP_HEADER, Res, uuid } from '@/core/common';
import { toDeepSnakeCase } from '@/core/method';

@Catch()
export class RequestExceptionFilter implements ExceptionFilter {
  constructor(
    @AsyncInject(LoggerManager) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Res>();
    const { originalUrl, body, query, method, headers } = host.switchToHttp().getRequest();

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

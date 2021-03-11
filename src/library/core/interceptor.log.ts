import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { headersConstant, ResponseBody } from '@common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { getIp } from '../utils';
import { LoggerProvider } from '../logger';

/**
 * Log the request details
 *
 * @see: [interceptors](https://docs.nestjs.com/interceptors)
 */
@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerProvider) {}

  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = ctx.switchToHttp().getRequest();
    const response: Response = ctx.switchToHttp().getResponse();
    const { originalUrl, body, query, method, headers } = request;
    headers[headersConstant.requestId] = headers[headersConstant.requestId] || uuid();

    let message = `|${method}| ${originalUrl}`;
    message += ` |${ctx.getClass().name}|`;
    message += ` |${ctx.getHandler().name}|`;
    message += `, ip=${getIp(request)}`;
    message += `, requestId=${headers[headersConstant.requestId]}`;

    this.logger.info(message);

    return next.handle().pipe(
      map((data: ResponseBody<any>) => {
        let responseMessage = `|SUCCESS| ${message}`;
        responseMessage += `, statusCode=${response.statusCode}`;
        responseMessage += `, headers=${JSON.stringify(headers)}`;
        responseMessage += `, query=${JSON.stringify(query)}`;
        responseMessage += `, body=${JSON.stringify(body)}`;
        responseMessage += `, responseBody=${JSON.stringify(data)}`;

        this.logger.info(responseMessage);
        return data;
      }),
    );
  }
}

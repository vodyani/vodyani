import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { map } from 'rxjs/operators';
import { IPUtil } from '@library/utils';
import { REQ, RES } from '@common/type';
import { ResponseBody } from '@common/interface';
import { LoggerProvider } from '@library/logger';
import { headersConstant } from '@common/constant';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

/**
 * Log the request details
 *
 * @see: [interceptors](https://docs.nestjs.com/interceptors)
 */
@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerProvider) {}

  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request: REQ = ctx.switchToHttp().getRequest();
    const response: RES = ctx.switchToHttp().getResponse();
    const { originalUrl, body, query, method, headers } = request;
    headers[headersConstant.requestId] = headers[headersConstant.requestId] || uuid();

    let message = `|${method}| ${originalUrl}`;
    message += ` |${ctx.getClass().name}|`;
    message += ` |${ctx.getHandler().name}|`;
    message += `, ip=${IPUtil.getIp(request)}`;
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

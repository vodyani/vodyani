import { v4 as uuid } from 'uuid';
import { IPUtil } from '@library/utils';
import { REQ, RES } from '@common/type';
import { LoggerProvider } from '@library/logger';
import { HttpStatusConstant, ResponseBody } from '@common/interface';
import { headersConstant, httpStatusConstant } from '@common/constant';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

/**
 * Catch exceptions during execution and log errors
 *
 * @see: [filters](https://docs.nestjs.com/exception-filters)
 */
@Catch()
export class ExceptionCatchFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerProvider) {}

  private readonly options: HttpStatusConstant = httpStatusConstant

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: REQ = ctx.getRequest();
    const response: RES = ctx.getResponse();
    const { originalUrl, body, query, method, headers } = request;
    const requestId = (request.headers[headersConstant.requestId] || uuid()) as string;

    // Gets the instance code from the exception object
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 400;
    // Bind the corresponding information
    const statusInfo = this.options.status.get(statusCode);
    // Define the response body (json)
    const data = null;
    const timestamp = Date.now();
    const code = statusInfo.code;
    const errorCode = statusInfo.errorCode;
    const message = exception.message || statusInfo[this.options.language];

    let responseMessage = `|ERROR| |${method}| ${originalUrl}`;
    responseMessage += `, ip=${IPUtil.getIp(request)}`;
    responseMessage += `, requestId=${requestId}`;
    responseMessage += `, statusCode=${response.statusCode}`;
    responseMessage += `, headers=${JSON.stringify(headers)}`;
    responseMessage += `, query=${JSON.stringify(query)}`;
    responseMessage += `, body=${JSON.stringify(body)}`;
    responseMessage += `, responseBody=${JSON.stringify({ code, errorCode, message })}`;

    this.logger.error(responseMessage);

    response.status(200);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send({ data, code, errorCode, message, timestamp, requestId } as ResponseBody<null>);
  }
}

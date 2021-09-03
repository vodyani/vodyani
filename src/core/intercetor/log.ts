import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { map } from 'rxjs/operators';
import { HTTP_HEADER, IResponseBody } from '@/common';
import { WinstonLoggerProvider } from '@/extends/logger';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: WinstonLoggerProvider
  ) {}

  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = ctx.switchToHttp().getRequest();
    const { originalUrl, body, query, method, headers } = request;
    request.headers[HTTP_HEADER.REQUEST_ID] = request.headers[HTTP_HEADER.REQUEST_ID] || uuid();

    return next.handle().pipe(
      map((responseBody: IResponseBody<Record<string, any>>) => {
        this.logger.info(
          'LogInterceptor',
          {
            request: { originalUrl, method, headers, query, body },
            class: ctx.getClass().name,
            handler: ctx.getHandler().name,
          },
        );

        return responseBody;
      }),
    );
  }
}

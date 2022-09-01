import { SwaggerInfrastructure } from '@vodyani/swagger';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE, Container } from '@vodyani/core';

import { DefaultApi } from '@/api/default/module';
import { RequestExceptionFilter } from '@/core/filter';
import { DtoCamelCasePipe, DtoValidatePipe } from '@/core/pipe';
import { ConfigInfrastructure } from '@/infrastructure/config/module';
import { LoggerInfrastructure } from '@/infrastructure/logger/module';
import { RequestLogInterceptor, ResponseFormatInterceptor, ResponseSnakeCaseInterceptor } from '@/core/interceptor';

@Container({
  api: [
    DefaultApi,
  ],
  infrastructure: [
    SwaggerInfrastructure,
    ConfigInfrastructure.forRoot(),
    LoggerInfrastructure.forRoot(),
  ],
  aop: [
    { provide: APP_FILTER, useClass: RequestExceptionFilter },
    { provide: APP_PIPE, useClass: DtoCamelCasePipe },
    { provide: APP_PIPE, useClass: DtoValidatePipe },
    { provide: APP_INTERCEPTOR, useClass: RequestLogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseSnakeCaseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseFormatInterceptor },
  ],
})
export class AppContainer {}

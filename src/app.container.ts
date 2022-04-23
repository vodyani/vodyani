import { ContainerModule } from '@vodyani/core';
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { DefaultApi } from './api/default/module';
import { RequestExceptionFilter } from './core/filter';
import { ConfigModule } from './infrastructure/config/module';
import { LoggerModule } from './infrastructure/logger/module';
import { DtoValidatePipe, DtoCamelCasePipe } from './core/pipe';
import { LogInterceptor, ResultFormatInterceptor, ResultSnakeCaseInterceptor } from './core/interceptor';

@ContainerModule({
  api: [
    DefaultApi,
  ],
  infrastructure: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
  ],
  aop: [
    { provide: APP_FILTER, useClass: RequestExceptionFilter },
    { provide: APP_PIPE, useClass: DtoCamelCasePipe },
    { provide: APP_PIPE, useClass: DtoValidatePipe },
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResultSnakeCaseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResultFormatInterceptor },
  ],
})
export class CoreContainer {}

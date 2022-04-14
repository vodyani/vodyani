import {
  APP_PIPE,
  APP_FILTER,
  APP_INTERCEPTOR,
} from '@nestjs/core';
import {
  DtoValidatePipe,
  DtoCamelCasePipe,
  ContainerRegister,
  ResultSnakeCaseInterceptor,
} from '@vodyani/core';

import { DefaultApi } from './api/default/module';
import { RequestExceptionFilter } from './core/filter';
import { ConfigModule } from './infrastructure/config/module';
import { LoggerModule } from './infrastructure/logger/module';
import { LogInterceptor, ResultFormatInterceptor } from './core/interceptor';

@ContainerRegister({
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

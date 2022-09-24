import { DynamicModule } from '@nestjs/common';

import { RequestExceptionFilter } from './filter';
import { RequestLogInterceptor } from './interceptor';
import { LoggerManager } from './manager';

export class LoggerModule {
  static forRoot(): DynamicModule {
    const LoggerAsyncManager = new LoggerManager().create();

    const providers = [
      LoggerAsyncManager,
      RequestExceptionFilter,
      RequestLogInterceptor,
    ];

    return {
      global: true,
      exports: providers,
      providers: providers,
      module: LoggerModule,
    };
  }
}

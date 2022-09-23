import { DynamicModule } from '@vodyani/core';

import { LoggerManager } from './manager';
import { RequestExceptionFilter } from './filter';
import { RequestLogInterceptor } from './interceptor';

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

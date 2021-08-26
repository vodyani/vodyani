import * as Helmet from 'helmet';

import { ConfigModule } from '@/extends/config';
import { LoggerModule } from '@/extends/logger';
import { SwaggerModule } from '@/extends/swagger';
import { DefaultModule } from '@/modules/default';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { DTOPipe } from './pipe';
import { ExceptionFilter } from './filter';
import { LogInterceptor, ParamFormatInterceptor } from './intercetor';

@Module({
  /** 声明服务模块 */
  imports: [
    ConfigModule,
    LoggerModule,
    SwaggerModule,
    DefaultModule,
  ],
  /** 声明 AOP 执行器流程 */
  providers: [
    { provide: APP_FILTER, useClass: ExceptionFilter },
    { provide: APP_PIPE, useClass: DTOPipe },
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ParamFormatInterceptor },
  ],
})
export class CoreModule implements NestModule {
  /** 绑定模块中间件 */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      Helmet,
    );
  }
}

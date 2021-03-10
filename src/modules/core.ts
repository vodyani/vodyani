import { Module } from '@nestjs/common';
import { RedisModule } from '@lib/redis';
import { LoggerModule } from '@lib/logger';
import { ConfigModule } from '@lib/configs';
import { PostgresqlModule } from '@lib/postgresql';
import { DtoPipe, ExceptionCatchFilter, FormatInterceptor, LogInterceptor } from '@lib/core';

import { OrderModule } from './order';
import { HealthModule } from './health';

@Module({
  imports: [
    /**
     * The common modules
     */
    ConfigModule,
    LoggerModule,
    RedisModule,
    PostgresqlModule,
    /**
     * The server logic modules
     */
    OrderModule,
    HealthModule,
  ],
  exports: [
    DtoPipe,
    LogInterceptor,
    FormatInterceptor,
    ExceptionCatchFilter,
  ],
  providers: [
    DtoPipe,
    LogInterceptor,
    FormatInterceptor,
    ExceptionCatchFilter,
  ],
})

export class CoreModule {}

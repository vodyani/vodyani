import { Module } from '@nestjs/common';
import { RedisModule } from '@library/redis';
import { LoggerModule } from '@library/logger';
import { ConfigModule } from '@library/configs';
import { PostgresqlModule } from '@library/postgresql';
import { DtoPipe, ExceptionCatchFilter, FormatInterceptor, LogInterceptor } from '@library/core';

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

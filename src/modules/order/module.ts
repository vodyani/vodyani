import { Module } from '@nestjs/common';
import { RedisModule } from '@lib/redis';
import { LoggerModule } from '@lib/logger';
import { ConfigModule } from '@lib/configs';
import { PostgresqlModule } from '@lib/postgresql';

import { OrderController } from './controller';
import { OrderService } from './service';
import { OrderDao } from './dao';

@Module({
  imports: [
    RedisModule,
    ConfigModule,
    LoggerModule,
    PostgresqlModule,
  ],
  controllers: [
    OrderController,
  ],
  providers: [
    OrderService,
    OrderDao,
  ],
})
export class OrderModule {}

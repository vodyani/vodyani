import { Module } from '@nestjs/common';
import { RedisModule } from '@library/redis';
import { LoggerModule } from '@library/logger';
import { ConfigModule } from '@library/configs';
import { PostgresqlModule } from '@library/postgresql';

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

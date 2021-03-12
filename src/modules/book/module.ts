import { Module } from '@nestjs/common';
import { RedisModule } from '@library/redis';
import { ConfigModule } from '@library/configs';
import { PostgresqlModule } from '@library/postgresql';

import { BookController } from './controller';
import { BookService } from './service';
import { BookDao } from './dao';

@Module({
  imports: [
    RedisModule,
    ConfigModule,
    PostgresqlModule,
  ],
  controllers: [
    BookController,
  ],
  providers: [
    BookService,
    BookDao,
  ],
})
export class BookModule {}

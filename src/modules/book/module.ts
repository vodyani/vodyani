import { Module } from '@nestjs/common';

import { BookController } from './controller';
import { BookService } from './service';

@Module({
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

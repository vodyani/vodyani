import { Module } from '@nestjs/common';

import { Logger } from './service';

@Module({
  exports: [Logger],
  providers: [Logger],
})
export class LoggerModule {}

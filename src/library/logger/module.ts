import { Module } from '@nestjs/common';
import { ConfigModule } from '@library/configs';

import { SystemLogger } from './service';

@Module({
  imports: [ConfigModule],
  exports: [SystemLogger],
  providers: [SystemLogger],
})
export class LoggerModule {}

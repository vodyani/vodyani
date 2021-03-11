import { Module } from '@nestjs/common';

import { ConfigService } from './service';

@Module({
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}

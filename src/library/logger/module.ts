import { Module } from '@nestjs/common';
import { ConfigModule } from '@library/configs';

import { LoggerProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [LoggerProvider],
  providers: [LoggerProvider],
})
export class LoggerModule {}

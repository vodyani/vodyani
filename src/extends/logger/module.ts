import { Module } from '@nestjs/common';
import { ConfigModule } from '@/extends/config';

import { WinstonLoggerProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [WinstonLoggerProvider],
  providers: [WinstonLoggerProvider],
})
export class LoggerModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@/extends/config';

import { WinstonProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [WinstonProvider],
  providers: [WinstonProvider],
})
export class LoggerModule {}

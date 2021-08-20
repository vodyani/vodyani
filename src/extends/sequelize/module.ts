import { Module } from '@nestjs/common';
import { ConfigModule } from '@/extends/config';

import { SequelizeProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: SequelizeProvider.getProviders(),
  providers: SequelizeProvider.getProviders(),
})
export class SequelizeModule {}

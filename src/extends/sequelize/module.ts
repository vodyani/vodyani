import { Module } from '@nestjs/common';
import { ConfigModule } from '@/extends/config';

import { SequelizeFactoryProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [SequelizeFactoryProvider.getProvider()],
  providers: [SequelizeFactoryProvider.getProvider()],
})
export class SequelizeModule {}

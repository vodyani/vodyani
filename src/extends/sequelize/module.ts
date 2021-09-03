import { Module } from '@nestjs/common';
import { ConfigModule } from '@/extends/config';

import { SequelizeFactoryProvider, SequelizeUtilsProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [
    SequelizeUtilsProvider,
    SequelizeFactoryProvider.getProvider(),
  ],
  providers: [
    SequelizeUtilsProvider,
    SequelizeFactoryProvider.getProvider(),
  ],
})
export class SequelizeModule {}

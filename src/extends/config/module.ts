import { Module } from '@nestjs/common';

import { ConfigFactoryProvider } from './provider';

@Module({
  exports: [ConfigFactoryProvider.getProvider()],
  providers: [ConfigFactoryProvider.getProvider()],
})
export class ConfigModule {}

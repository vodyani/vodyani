import { Module } from '@nestjs/common';
import { ConfigModule } from '@library/configs';

import { RedisProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: RedisProvider.getProviders(),
  providers: RedisProvider.getProviders(),
})
export class RedisModule {}

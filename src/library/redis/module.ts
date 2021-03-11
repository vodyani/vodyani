import { Module } from '@nestjs/common';
import { RedisProvider } from './provider';
import { ConfigModule } from '@library/configs';

@Module({
  imports: [ConfigModule],
  exports: RedisProvider.getProviders(),
  providers: RedisProvider.getProviders(),
})
export class RedisModule {}

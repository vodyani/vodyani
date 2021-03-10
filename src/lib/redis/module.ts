import { Module } from '@nestjs/common';
import { RedisService } from './service';
import { ConfigModule } from '@lib/configs';

@Module({
  imports: [ConfigModule],
  exports: [RedisService.getProviders()],
  providers: [RedisService.getProviders()],
})
export class RedisModule {}

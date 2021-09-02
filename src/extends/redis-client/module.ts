import { Module } from '@nestjs/common';

import {
  CacheInterceptor,
  MutexInterceptor,
  HashCacheInterceptor,
  ClusterCacheInterceptor,
  HashClusterCacheInterceptor,
} from './interceptor';
import { ConfigModule } from '../config';
import { LoggerModule } from '../logger';
import { ClusterClientFactoryProvider, RedisClientFactoryProvider } from './provider';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
  ],
  exports: [
    CacheInterceptor,
    MutexInterceptor,
    HashCacheInterceptor,
    ClusterCacheInterceptor,
    HashClusterCacheInterceptor,
    RedisClientFactoryProvider.getProvider(),
    ClusterClientFactoryProvider.getProvider(),
  ],
  providers: [
    CacheInterceptor,
    MutexInterceptor,
    HashCacheInterceptor,
    ClusterCacheInterceptor,
    HashClusterCacheInterceptor,
    RedisClientFactoryProvider.getProvider(),
    ClusterClientFactoryProvider.getProvider(),
  ],
})
export class RedisClientModule {}

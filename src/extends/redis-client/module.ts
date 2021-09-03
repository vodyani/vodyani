import { Module } from '@nestjs/common';

import {
  RedisUtilsProvider,
  RedisClientFactoryProvider,
  ClusterClientFactoryProvider,
} from './provider';
import {
  CacheInterceptor,
  MutexInterceptor,
  HashCacheInterceptor,
  ClusterCacheInterceptor,
  HashClusterCacheInterceptor,
} from './interceptor';
import { ConfigModule } from '../config';
import { LoggerModule } from '../logger';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
  ],
  exports: [
    CacheInterceptor,
    MutexInterceptor,
    RedisUtilsProvider,
    HashCacheInterceptor,
    ClusterCacheInterceptor,
    HashClusterCacheInterceptor,
    RedisClientFactoryProvider.getProvider(),
    ClusterClientFactoryProvider.getProvider(),
  ],
  providers: [
    CacheInterceptor,
    MutexInterceptor,
    RedisUtilsProvider,
    HashCacheInterceptor,
    ClusterCacheInterceptor,
    HashClusterCacheInterceptor,
    RedisClientFactoryProvider.getProvider(),
    ClusterClientFactoryProvider.getProvider(),
  ],
})
export class RedisClientModule {}

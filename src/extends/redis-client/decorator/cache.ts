import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { ICacheOptions, RedisDecoratorOptionType } from '../common';
import { CacheInterceptor, ClusterCacheInterceptor } from '../interceptor';

export function Cache(options: ICacheOptions) {
  return applyDecorators(
    SetMetadata(RedisDecoratorOptionType.CACHE, options),
    UseInterceptors(CacheInterceptor)
  );
}

export function ClusterCache(options: ICacheOptions) {
  return applyDecorators(
    SetMetadata(RedisDecoratorOptionType.CACHE, options),
    UseInterceptors(ClusterCacheInterceptor),
  );
}

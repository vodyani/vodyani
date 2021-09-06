import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { IHashCacheOptions, RedisDecoratorOptionType } from '../common';
import { HashCacheInterceptor, HashClusterCacheInterceptor } from '../interceptor';

export function HashCache(options: IHashCacheOptions) {
  return applyDecorators(
    SetMetadata(RedisDecoratorOptionType.HASH_CACHE, options),
    UseInterceptors(HashCacheInterceptor)
  );
}

export function HashClusterCache(options: IHashCacheOptions) {
  return applyDecorators(
    SetMetadata(RedisDecoratorOptionType.HASH_CACHE, options),
    UseInterceptors(HashClusterCacheInterceptor),
  );
}

import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { IHashCacheOptions } from '../common';
import { HashCacheInterceptor, HashClusterCacheInterceptor } from '../interceptor';

export function HashCache(options: IHashCacheOptions) {
  return applyDecorators(
    SetMetadata('HASH_CACHE_OPTIONS', options),
    options.type === 'client'
      ? UseInterceptors(HashCacheInterceptor)
      : UseInterceptors(HashClusterCacheInterceptor),
  );
}

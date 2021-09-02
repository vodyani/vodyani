import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { ICacheOptions } from '../common';
import { CacheInterceptor, ClusterCacheInterceptor } from '../interceptor';

export function Cache(options: ICacheOptions) {
  return applyDecorators(
    SetMetadata('CACHE_OPTIONS', options),
    options.type === 'client'
      ? UseInterceptors(CacheInterceptor)
      : UseInterceptors(ClusterCacheInterceptor),
  );
}

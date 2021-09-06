import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { MutexInterceptor } from '../interceptor';
import { IMutexOptions, RedisDecoratorOptionType } from '../common';

export function Mutex(options: IMutexOptions) {
  return applyDecorators(
    SetMetadata(RedisDecoratorOptionType.MUTEX, options),
    UseInterceptors(MutexInterceptor),
  );
}

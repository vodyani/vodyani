import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { IMutexOptions } from '../common';
import { MutexInterceptor } from '../interceptor';

export function Mutex(options: IMutexOptions) {
  return applyDecorators(
    SetMetadata('MUTEX_OPTIONS', options),
    UseInterceptors(MutexInterceptor),
  );
}

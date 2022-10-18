import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import { isValidDict } from '@vodyani/utils';

import { hasStreamable, toDeepSnakeCase } from '@/core/method';

@Injectable()
export class ResponseSnakeCaseInterceptor implements NestInterceptor {
  public intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map(data => {
      return hasStreamable(data) && !isValidDict(data)
        ? data
        : toDeepSnakeCase(data);
    }));
  }
}


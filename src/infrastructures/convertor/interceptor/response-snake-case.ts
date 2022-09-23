import { map } from 'rxjs';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@vodyani/core';

import { isStreamableFile, toDeepSnakeCase } from '@/core/method';

@Injectable()
export class ResponseSnakeCaseInterceptor implements NestInterceptor {
  public intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map(result => {
      return isStreamableFile(result) ? result : toDeepSnakeCase(result);
    }));
  }
}


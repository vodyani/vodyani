import { toDeepCamelCase, toDeepSnakeCase } from '@vodyani/transformer';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { resultIntercept } from '../method';

@Injectable()
export class ResultCamelCaseInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler) {
    return resultIntercept(next, toDeepCamelCase);
  }
}

@Injectable()
export class ResultSnakeCaseInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler) {
    return resultIntercept(next, toDeepSnakeCase);
  }
}

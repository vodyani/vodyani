import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@vodyani/core';

import { responseIntercept, toDeepSnakeCase } from '../method';

@Injectable()
export class ResponseSnakeCaseInterceptor implements NestInterceptor {
  public intercept(_: ExecutionContext, next: CallHandler) {
    return responseIntercept(next, body => toDeepSnakeCase(body));
  }
}


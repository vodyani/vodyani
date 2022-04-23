import { Observable, map, tap } from 'rxjs';
import { CallHandler } from '@nestjs/common';
import { isBuffer, isArrayBuffer } from 'lodash';
import { isValidStream } from '@vodyani/validator';

export function resultIntercept(next: CallHandler, handler: (...args: any[]) => any): Observable<any> {
  return next.handle().pipe(map((result: any) => {
    if (isValidStream(result) || isBuffer(result) || isArrayBuffer(result)) {
      return result;
    }

    return handler(result);
  }));
}

export function afterIntercept(next: CallHandler, handler: (...args: any[]) => any): Observable<any> {
  return next.handle().pipe(tap(handler));
}

import { Observable, map, tap } from 'rxjs';
import { CallHandler } from '@nestjs/common';
import { isValidStream } from '@vodyani/utils';
import { isArrayBuffer, isBuffer } from 'lodash';


export function resultIntercept(next: CallHandler, handler: (...args: any[]) => any): Observable<any> {
  return next.handle().pipe(tap((data) => {
    handler();
    return data;
  }));
}

export function responseIntercept<T = any>(next: CallHandler, handler: (...args: any[]) => T): Observable<T> {
  return next.handle().pipe(map((result: any) => {
    return isValidStream(result) || isBuffer(result) || isArrayBuffer(result)
      ? result
      : handler(result);
  }));
}

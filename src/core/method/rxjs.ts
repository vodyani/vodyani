import { CallHandler } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

import { isStreamableFile } from './validate';

export function resultIntercept(next: CallHandler, handler: (...args: any[]) => any): Observable<any> {
  return next.handle().pipe(tap(data => {
    handler();
    return data;
  }));
}

export function responseIntercept<T = any>(next: CallHandler, handler: (...args: any[]) => T): Observable<T> {
  return next.handle().pipe(map(data => {
    return isStreamableFile(data) ? data : handler(data);
  }));
}

import { StreamableFile } from '@nestjs/common';
import { isValid, isValidArray, isValidArrayBuffer, isValidBuffer, isValidStream } from '@vodyani/utils';

export function hasStreamable(data: any): boolean {
  if (!isValid(data)) {
    return false;
  }

  const cases = [
    isValidBuffer,
    isValidStream,
    isValidArrayBuffer,
    (data: any) => data instanceof StreamableFile,
  ];

  for (const fn of cases) {
    if (fn(data)) {
      return true;
    }
  }

  if (isValidArray(data)) {
    return (data as any[]).findIndex(e => hasStreamable(e)) !== -1;
  }

  return false;
}

import { StreamableFile } from '@nestjs/common';
import { isValidArray, isValidBuffer } from '@vodyani/utils';

export function isMulterFile(data: any) {
  return isValidArray(data)
    ? data.findIndex((e: Express.Multer.File) => isValidBuffer(e.buffer)) !== -1
    : isValidBuffer(data.buffer);
}

export function isStreamableFile(data: any) {
  return data instanceof StreamableFile;
}

import { isBuffer, isArrayBuffer } from 'lodash';
import { isValidStream } from '@vodyani/validator';
import { toDeepCamelCase } from '@vodyani/transformer';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(data: any) {
    if (isValidStream(data) || isBuffer(data) || isArrayBuffer(data)) {
      return data;
    }

    return toDeepCamelCase(data);
  }
}

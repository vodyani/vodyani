import { isValidStream } from '@vodyani/utils';
import { isArrayBuffer, isBuffer } from 'lodash';
import { Injectable, PipeTransform } from '@nestjs/common';

import { toDeepCamelCase } from '../method';

@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(data: any) {
    return isValidStream(data) || isBuffer(data) || isArrayBuffer(data)
      ? data
      : toDeepCamelCase(data);
  }
}

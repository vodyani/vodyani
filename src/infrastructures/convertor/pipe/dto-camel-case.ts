import { Injectable, PipeTransform } from '@nestjs/common';
import { isValidDict } from '@vodyani/utils';

import { hasStreamable, toDeepCamelCase } from '@/core/method';

@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(data: any) {
    return hasStreamable(data) && !isValidDict(data)
      ? data
      : toDeepCamelCase(data);
  }
}

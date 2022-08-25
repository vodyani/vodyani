import { Injectable, PipeTransform } from '@nestjs/common';

import { toDeepCamelCase } from '../method';

@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(value: any) {
    return toDeepCamelCase(value);
  }
}

import { Injectable, PipeTransform } from '@nestjs/common';

import { isMulterFile, toDeepCamelCase } from '@/core/method';

@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(data: any) {
    return isMulterFile(data) ? data : toDeepCamelCase(data);
  }
}

import { toDeepCamelCase } from '@vodyani/transformer';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(value: any) {
    return toDeepCamelCase(value);
  }
}

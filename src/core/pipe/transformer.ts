import { isBuffer, isArrayBuffer } from 'lodash';
import { classAssemble } from '@vodyani/transformer';
import { isValid, isValidObject, isValidStream } from '@vodyani/validator';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DtoTransformer implements PipeTransform<any> {
  public async transform(data: any, argument: ArgumentMetadata) {
    if (isValidStream(data) || isBuffer(data) || isArrayBuffer(data)) {
      return data;
    }

    if (isValidObject(argument) && isValid(argument.metatype)) {
      const result = await classAssemble(argument.metatype, data);
      return result;
    }

    return data;
  }
}

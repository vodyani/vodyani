import { isBuffer, isArrayBuffer } from 'lodash';
import { toValidateClass } from '@vodyani/class-decorator';
import { isValid, isValidDict, isValidStream } from '@vodyani/utils';
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, argument: ArgumentMetadata) {
    if (isValidStream(data) || isBuffer(data) || isArrayBuffer(data)) {
      return data;
    }

    if (isValidDict(argument) && isValid(argument.metatype)) {
      const errorMessage = await toValidateClass(argument.metatype, data);

      if (errorMessage) {
        throw new HttpException(errorMessage, 422);
      }
    }

    return data;
  }
}

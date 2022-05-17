import { isBuffer, isArrayBuffer } from 'lodash';
import { isValid, isValidObject, isValidStream, toValidateClass } from '@vodyani/validator';
import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, argument: ArgumentMetadata) {
    if (isValidStream(data) || isBuffer(data) || isArrayBuffer(data)) {
      return data;
    }

    if (isValidObject(argument) && isValid(argument.metatype)) {
      const errorMessage = await toValidateClass(argument.metatype, data);

      if (errorMessage) {
        throw new UnauthorizedException(errorMessage);
      }
    }

    return data;
  }
}

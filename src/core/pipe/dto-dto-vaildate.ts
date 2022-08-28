import { toValidateClass } from '@vodyani/class-decorator';
import { isValid, isValidDict } from '@vodyani/utils';
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

import { isMulterFile } from '../method';

@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, argument: ArgumentMetadata) {
    if (!isMulterFile(data) && isValidDict(argument) && isValid(argument.metatype)) {
      const errorMessage = await toValidateClass(argument.metatype, data);

      if (errorMessage) {
        throw new HttpException(errorMessage, 422);
      }
    }

    return data;
  }
}

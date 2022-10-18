import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { toValidateClass } from '@vodyani/class-decorator';
import { isValid, isValidDict } from '@vodyani/utils';

import { hasStreamable } from '@/core/method';

@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, metadata: ArgumentMetadata) {
    if (!hasStreamable(data) && isValidDict(metadata) && isValid(metadata.metatype)) {
      const errorMessage = await toValidateClass(metadata.metatype, data);

      if (errorMessage) {
        throw new HttpException(errorMessage, 422);
      }
    }

    return data;
  }
}

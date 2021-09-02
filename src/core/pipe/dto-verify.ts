import { HTTP_STATUS } from '@/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ArgumentMetadata, Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class DTOVerifyPipe implements PipeTransform<any> {
  public async transform(value: Record<string, any>, { metatype }: ArgumentMetadata) {
    if (!metatype) return value;

    const baseTypes = [String, Boolean, Number, Array, Object];
    const isBaseType = !!baseTypes.find((type) => metatype === type);

    if (isBaseType) return value;

    const details = plainToClass(metatype, value);
    const errors: ValidationError[] = await validate(details);

    if (!errors || !errors.length) return value;

    for (const error of errors) {
      if (error.constraints) {
        const message = Object.values(error.constraints)[0];
        throw new HttpException(message, HTTP_STATUS.UNPROCESSABLE);
      }
    }
  }
}

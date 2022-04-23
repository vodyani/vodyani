import { PaginationInfo } from '@vodyani/core';
import { getDefaultNumber } from '@vodyani/transformer';
import { IsNotEmpty, IsNumber, Transform } from '@vodyani/validator';

export class PaginationDo implements PaginationInfo {
  @Transform(it => getDefaultNumber(it.value))
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  public index: number;

  @Transform(it => getDefaultNumber(it.value))
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  public size: number;

  @Transform(it => getDefaultNumber(it.value))
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  public count: number;

  @Transform(it => getDefaultNumber(it.value))
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  public pageCount: number;
}

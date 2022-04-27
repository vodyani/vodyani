import { PaginationInfo } from '@vodyani/core';
import { IsNotEmpty, IsNumber } from '@vodyani/validator';
import { ValueTransform, convertNumber, Expose } from '@vodyani/transformer';

export class PaginationDo implements PaginationInfo {
  @IsNotEmpty() @IsNumber({ allowNaN: false, allowInfinity: false })
  @Expose() @ValueTransform(convertNumber)
  public index: number;

  @IsNotEmpty() @IsNumber({ allowNaN: false, allowInfinity: false })
  @Expose() @ValueTransform(convertNumber)
  public size: number;

  @IsNotEmpty() @IsNumber({ allowNaN: false, allowInfinity: false })
  @Expose() @ValueTransform(convertNumber)
  public count: number;

  @IsNotEmpty() @IsNumber({ allowNaN: false, allowInfinity: false })
  @Expose() @ValueTransform(convertNumber)
  public pageCount: number;
}

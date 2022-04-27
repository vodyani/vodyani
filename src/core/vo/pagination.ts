import { Expose } from '@vodyani/transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationInfo } from '@vodyani/core';

export class PaginationResultVo implements PaginationInfo {
  @Expose()
  @ApiProperty({ name: 'index', type: Number, required: true, example: 1, description: 'index' })
  public index: number;

  @Expose()
  @ApiProperty({ name: 'size', type: Number, required: true, example: 10, description: 'size' })
  public size: number;

  @Expose()
  @ApiProperty({ name: 'count', type: Number, required: true, example: 10, description: 'count' })
  public count: number;

  @Expose()
  @ApiProperty({ name: 'page_count', type: Number, required: true, example: 10, description: 'current page count' })
  public pageCount: number;
}

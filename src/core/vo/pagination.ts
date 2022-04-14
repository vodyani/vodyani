import { ApiProperty } from '@nestjs/swagger';
import { PaginationInfo } from '@vodyani/core';

export class PaginationResultVo implements PaginationInfo {
  @ApiProperty({ name: 'index', type: Number, required: true, example: 1, description: 'index' })
  public index: number;

  @ApiProperty({ name: 'size', type: Number, required: true, example: 10, description: 'size' })
  public size: number;

  @ApiProperty({ name: 'count', type: Number, required: true, example: 10, description: 'count' })
  public count: number;

  @ApiProperty({ name: 'page_count', type: Number, required: true, example: 10, description: 'current page count' })
  public pageCount: number;
}

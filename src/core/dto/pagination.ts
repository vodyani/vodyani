import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryOptions } from '@vodyani/core';

export class PaginationQueryDto implements PaginationQueryOptions {
  @ApiProperty({ name: 'index', example: '1', type: String, description: 'index' })
  public index?: string;

  @ApiProperty({ name: 'size', example: '20', type: String, description: 'size' })
  public size?: string;

  @ApiProperty({ name: 'order_by', example: 'id', type: String, description: 'pagination order by' })
  public orderBy?: string;

  @ApiProperty({ name: 'order_rule', example: 'desc', type: String, description: 'pagination order rule' })
  public orderRule?: 'desc' | 'asc';
}

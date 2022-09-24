import { ApiProperty } from '@vodyani/swagger';
import { toNumber, toString } from '@vodyani/utils';
import { Expose, ValueTransformer } from '@vodyani/class-decorator';

export class PaginationQueryDto {
  @Expose() @ValueTransformer((data: string) => toNumber(data, 1))
  @ApiProperty({ name: 'index', example: '1', default: '1', type: String, description: 'index' })
  public index?: number;

  @Expose() @ValueTransformer((data: string) => toNumber(data, 1))
  @ApiProperty({ name: 'size', example: '20', default: '20', type: String, description: 'size' })
  public size?: number;

  @Expose() @ValueTransformer((filed: string) => toString(filed, 'id'))
  @ApiProperty({ name: 'order_by', example: 'id', default: 'id', type: String, description: 'pagination order by' })
  public orderBy?: string;

  @Expose() @ValueTransformer((rule: string) => toString(rule, 'desc'))
  @ApiProperty({ name: 'order_rule', example: 'desc', default: 'desc', type: String, description: 'pagination order rule' })
  public orderRule?: 'desc' | 'DESC' | 'asc' | 'ASC';
}

import { Expose, ValueTransformer } from '@vodyani/class-decorator';
import { IRequestPage } from '@vodyani/core';
import { ApiProperty } from '@vodyani/swagger';
import { toNumber, toString } from '@vodyani/utils';

export class RequestPageDTO implements IRequestPage {
  @Expose()
  @ValueTransformer((v: string) => toNumber(v, 1))
  @ApiProperty({ name: 'index', type: String, example: '1', required: false, description: 'search page index' })
  public index?: number;

  @Expose()
  @ValueTransformer((v: string) => toNumber(v, 20))
  @ApiProperty({ name: 'size', type: String, example: '20', required: false, description: 'search page size' })
  public size?: number;

  @Expose()
  @ValueTransformer((v: string) => toString(v, 'id'))
  @ApiProperty({ name: 'order_by', type: String, example: 'id', required: false, description: 'search order filed' })
  public orderBy?: string;

  @Expose()
  @ValueTransformer((v: string) => toString(v, 'asc'))
  @ApiProperty({ name: 'order_rule', type: String, example: 'asc', required: false, description: 'search order rule' })
  public orderRule?: 'desc' | 'DESC' | 'asc' | 'ASC';
}

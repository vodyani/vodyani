import { Expose, ValueTransformer } from '@vodyani/class-decorator';
import { ApiProperty } from '@vodyani/swagger';
import { toNumber } from '@vodyani/utils';

export class PageDo {
  @Expose() @ValueTransformer(toNumber)
  @ApiProperty({ name: 'index', type: Number, required: true, example: 1, description: 'index' })
  public index: number;

  @Expose() @ValueTransformer(toNumber)
  @ApiProperty({ name: 'size', type: Number, required: true, example: 10, description: 'size' })
  public size: number;

  @Expose() @ValueTransformer(toNumber)
  @ApiProperty({ name: 'count', type: Number, required: true, example: 1, description: 'count' })
  public count: number;

  @Expose() @ValueTransformer(toNumber)
  @ApiProperty({ name: 'page_count', type: Number, required: true, example: 1, description: 'page count' })
  public pageCount: number;
}

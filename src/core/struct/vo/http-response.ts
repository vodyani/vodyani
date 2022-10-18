import { Expose } from '@vodyani/class-decorator';
import { IPage, IResponseBody } from '@vodyani/core';
import { ApiProperty, SwaggerEntity } from '@vodyani/swagger';

@SwaggerEntity
export class ResponsePageVO implements IPage {
  @Expose()
  @ApiProperty({ name: 'index', type: Number, required: true, description: 'page index' })
  public index: number;

  @Expose()
  @ApiProperty({ name: 'size', type: Number, required: true, description: 'page size' })
  public size: number;

  @Expose()
  @ApiProperty({ name: 'count', type: Number, required: true, description: 'total count' })
  public count: number;

  @Expose()
  @ApiProperty({ name: 'size', type: Number, required: true, description: 'total page count' })
  public pageCount: number;
}

@SwaggerEntity
export class ResponseBodyVO<T = any> implements IResponseBody {
  @ApiProperty({ name: 'code', type: Number, required: true, description: 'response code' })
  public code: number;

  @ApiProperty({ name: 'message', type: String, required: true, description: 'response message' })
  public message: string;

  @ApiProperty({ name: 'request_id', type: String, required: true, description: 'request id' })
  public requestId: string;

  @ApiProperty({ name: 'request_time', type: Number, required: true, description: 'request time' })
  public requestTime: number;

  @ApiProperty({ name: 'response_time', type: Number, required: true, description: 'response time' })
  public responseTime: number;

  @ApiProperty({ name: 'data', type: Number, required: true, description: 'response data' })
  public data: T;
}

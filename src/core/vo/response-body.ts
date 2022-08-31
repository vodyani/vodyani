import { Expose } from '@vodyani/class-decorator';
import { ApiProperty, SwaggerEntity } from '@vodyani/swagger';

import { ResponseBody } from '../common';

@SwaggerEntity
export class ResponseBodyVo<T = any> implements ResponseBody {
  @Expose()
  @ApiProperty({ name: 'code', type: Number, required: true, description: 'response code' })
  public code: number;

  @Expose()
  @ApiProperty({ name: 'message', type: String, required: true, description: 'response message' })
  public message: string;

  @Expose()
  @ApiProperty({ name: 'request_id', type: String, required: true, description: 'request id' })
  public requestId: string;

  @Expose()
  @ApiProperty({ name: 'request_time', type: Number, required: true, description: 'request time' })
  public requestTime: number;

  @Expose()
  @ApiProperty({ name: 'response_time', type: Number, required: true, description: 'response time' })
  public responseTime: number;

  @Expose()
  @ApiProperty({ name: 'data', type: Number, required: true, description: 'response data' })
  public data: T;
}

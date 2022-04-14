import { ApiProperty } from '@nestjs/swagger';

import { ResponseBody } from '../common';

export class ResponseBodyVo<T> implements ResponseBody {
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

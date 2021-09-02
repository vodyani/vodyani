import { ApiProperty } from '@nestjs/swagger';
import { IRequestPage, IResponseBody, IResponsePage } from '@/common';

/** http 通用返回参数 */
export class HttpResponseBodyBO<T> implements IResponseBody {
  data: T;

  @ApiProperty({ name: 'code', type: Number, required: true, description: '状态码' })
  code: number;

  @ApiProperty({ name: 'message', type: String, required: true, description: '消息内容' })
  message: string;

  @ApiProperty({ name: 'requestId', type: String, required: true, description: '请求标识' })
  requestId: string;

  @ApiProperty({ name: 'requestTime', type: Number, required: true, description: '请求接入时间，毫秒级时间戳' })
  requestTime: number;

  @ApiProperty({ name: 'responseTime', type: Number, required: true, description: '请求返回时间，毫秒级时间戳' })
  responseTime: number;
}

/** http 页码信息的返回参数 */
export class HttpResponsePageBO implements IResponsePage {
  @ApiProperty({ name: 'index', type: Number, required: true, example: 1, description: '页数' })
  index: number;

  @ApiProperty({ name: 'size', type: Number, required: true, example: 10, description: '页码' })
  size: number;

  @ApiProperty({ name: 'count', type: Number, required: true, example: 10, description: '总条数' })
  count: number;

  @ApiProperty({ name: 'pageCount', type: Number, required: true, example: 10, description: '总页数' })
  pageCount: number;
}

/** http 分页信息的请求参数 */
export class HttpRequestPageDTO implements IRequestPage {
  @ApiProperty({ name: 'id', type: String, required: false, example: '1', description: '主键ID' })
  id?: string;

  @ApiProperty({ name: 'index', example: '1', type: String, description: '页数' })
  index?: string;

  @ApiProperty({ name: 'size', example: '10', type: String, description: '页码' })
  size?: string;

  @ApiProperty({ name: 'orderBy', example: 'id', type: String, description: '排序字段' })
  orderBy?: string;

  @ApiProperty({ name: 'orderRule', example: 'desc', type: String, description: '排序规则 desc=降序排序 asc=升序排序' })
  orderRule?: string;
}

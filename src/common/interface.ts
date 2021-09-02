/**
 * ==========================================
 * HTTP SERVER
 * ==========================================
 */

export interface IRequestPage {
  /** 页数 */
  index?: string | number;
  /** 页码 */
  size?: string | number;
  /** 排序字段，默认是 id */
  orderBy?: string;
  /** 排序规则 desc=降序排序 asc=升序排序  */
  orderRule?: string;
}

export interface IResponseBody<T = any> {
  /** 具体数据 */
  data?: T;
  /** 服务端状态码 */
  code?: number;
  /** 服务端返回信息 */
  message?: string;
  /** 用于查询日志，由网关下发 */
  requestId?: string;
  /** 请求接入时间，毫秒级时间戳 */
  requestTime?: number;
  /** 请求返回时间，毫秒级时间戳 */
  responseTime?: number;
}

export interface IResponsePage {
  /** 页数 */
  index?: number;
  /** 页码 */
  size?: number;
  /** 总条数 */
  count?: number;
  /** 总页数  */
  pageCount?: number;
}

export interface IResponsePaginated<T = any> {
  /** 分页数组 */
  rows?: T[];
  /** 分页信息 */
  page?: IResponsePage;
}

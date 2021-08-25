/** http response body */
export interface IHttpResponseBody<T = any> {
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

/** 页码信息 */
export interface IHttpResponsePage {
  /** 页数 */
  index?: number;
  /** 页码 */
  size?: number;
  /** 总条数 */
  count?: number;
  /** 总页数  */
  pageCount?: number;
}

/** http response data 中的分页信息 */
export interface IHttpResponsePaginated<T = any> {
  rows?: T[];
  page?: IHttpResponsePage;
}

/** http request 分页请求参数 */
export interface IHttpRequestPage {
  /** 页数 */
  index?: string | number;
  /** 页码 */
  size?: string | number;
  /** 排序字段，默认是 id */
  orderBy?: string;
  /** 排序规则 desc=降序排序 asc=升序排序  */
  orderRule?: string;
}

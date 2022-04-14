/**
 * After the formatted interceptor transformation, the resulting http response body
 */
export interface ResponseBody<T = any> {
  /**
   * Specific data information
   */
  data?: T;
  /**
   * Status code on the server
   */
  code?: number;
  /**
   * Status message on the server
   */
  message?: string;
  /**
   * Server request id
   */
  requestId?: string;
  /**
   * Server request time
   */
  requestTime?: number;
  /**
   * Server response time
   */
  responseTime?: number;
}

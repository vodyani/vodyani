import { HTTP_STATUS } from '../enum';

/**
 * Structure of a map set for typical http status codes
*/
export const httpStatus = new Map([
  /**
   * In the following location, declare the base status code.
   */
  [HTTP_STATUS.SUCCESS, { code: 200, statusCode: 200, message: 'SUCCESS' }],
  [HTTP_STATUS.BAD_REQUEST, { code: 400, statusCode: 400, message: 'BAD_REQUEST' }],
  [HTTP_STATUS.UNAUTHORIZED, { code: 401, statusCode: 401, message: 'UNAUTHORIZED' }],
  [HTTP_STATUS.FORBIDDEN, { code: 403, statusCode: 403, message: 'FORBIDDEN' }],
  [HTTP_STATUS.NOT_FOUND, { code: 404, statusCode: 404, message: 'NOT_FOUND' }],
  [HTTP_STATUS.TIMEOUT, { code: 408, statusCode: 408, message: 'TIMEOUT' }],
  [HTTP_STATUS.UNPROCURABLE, { code: 422, statusCode: 422, message: 'UNPROCURABLE' }],
  [HTTP_STATUS.BAD_SERVER, { code: 500, statusCode: 500, message: 'BAD_SERVER' }],
  [HTTP_STATUS.NOT_IMPLEMENTED, { code: 501, statusCode: 501, message: 'NOT_IMPLEMENTED' }],
  [HTTP_STATUS.BAD_GATEWAY, { code: 502, statusCode: 502, message: 'BAD_GATEWAY' }],
  [HTTP_STATUS.UNAVAILABLE, { code: 503, statusCode: 503, message: 'UNAVAILABLE' }],
  /**
   * Here you can define a custom status code using the rule: `{statusCode}0000{self-incrementing}`
   *
   * @usageNotes {HTTP_STATUS.UNPROCURABLE}0000{1} -> 42200001
   */
  [HTTP_STATUS.LOGIN_UNPROCURABLE, { code: 42200001, statusCode: 422, message: 'LOGIN_UNPROCURABLE' }],
]);

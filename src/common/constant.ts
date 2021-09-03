import { resolve } from 'path';

import { HTTP_STATUS } from './enum';

/**
 * ==========================================
 * GLOBAL
 * ==========================================
 */

const src = resolve(__dirname, '../');
const root = resolve(__dirname, '../../');

/** 全局公用路径 */
export const path = {
  /** src目录 */
  src,
  /** 根目录 */
  root,
  /** 临时目录 */
  temp: `${root}/temp`,
  /** 日志目录 */
  logs: `${root}/logs`,
  /** 公共约定/类型/常量目录 */
  common: `${src}/common`,
  /** 拓展模块目录 */
  extends: `${src}/extends`,
  /** 业务模块目录 */
  modules: `${src}/modules`,
};

/**
 * ==========================================
 * HTTP SERVER
 * ==========================================
 */

/** http 状态码 */
export const httpStatusMap = new Map([
  /** http 基础状态码 */
  [HTTP_STATUS.SUCCESS, { code: 0, statusCode: 200, message: '请求成功' }],
  [HTTP_STATUS.BAD_REQUEST, { code: 400, statusCode: 400, message: '请求有误' }],
  [HTTP_STATUS.UNAUTHORIZED, { code: 401, statusCode: 401, message: '拒绝访问' }],
  [HTTP_STATUS.FORBIDDEN, { code: 403, statusCode: 403, message: '无权限访问' }],
  [HTTP_STATUS.NOT_FOUND, { code: 404, statusCode: 404, message: '未找到访问资源' }],
  [HTTP_STATUS.TIMEOUT, { code: 408, statusCode: 408, message: '请求超时' }],
  [HTTP_STATUS.UNPROCESSABLE, { code: 422, statusCode: 422, message: '参数有误' }],
  [HTTP_STATUS.BAD_SERVER, { code: 500, statusCode: 500, message: '服务执行异常' }],
  [HTTP_STATUS.NOT_IMPLEMENTED, { code: 501, statusCode: 501, message: '服务执行失败' }],
  [HTTP_STATUS.BAD_GATEWAY, { code: 502, statusCode: 502, message: '网关访问异常' }],
  [HTTP_STATUS.UNAVAILABLE, { code: 503, statusCode: 503, message: '服务升级中，暂不可用' }],

  /** 自定义状态码 */
  /** 规则：{statusCode}0000{自增} */
  [HTTP_STATUS.LOGIN_UNPROCESSABLE, { code: 42200001, statusCode: 422, message: '登录参数不符合要求' }],
]);

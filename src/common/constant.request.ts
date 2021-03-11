import { HttpStatusConstant } from './interface.request';

export const headersConstant = {
  requestId: 'x-request-id',
  requestToken: 'x-request-token',
  requestUserId: 'x-request-user-id',
};

export const httpStatusConstant: HttpStatusConstant = {
  language: 'en',
  status: new Map([
    [200, { code: 0, errorCode: 200, zh: '请求成功', en: 'Success' }],
    [400, { code: 400, errorCode: 400, zh: '请求有误', en: 'BadRequest' }],
    [401, { code: 401, errorCode: 401, zh: '拒绝访问', en: 'Forbidden' }],
    [403, { code: 403, errorCode: 403, zh: '无权限访问', en: 'Unauthorized' }],
    [404, { code: 404, errorCode: 404, zh: '未找到访问资源', en: 'NotFound' }],
    [408, { code: 408, errorCode: 408, zh: '请求超时', en: 'Timeout' }],
    [422, { code: 422, errorCode: 422, zh: '参数有误', en: 'Unprocessable' }],
    [500, { code: 500, errorCode: 500, zh: '服务端异常', en: 'InternalServerError' }],
    [501, { code: 501, errorCode: 501, zh: '服务端执行失败', en: 'NotImplemented' }],
    [502, { code: 502, errorCode: 502, zh: '服务端网关访问异常', en: 'BadGateway' }],
    [503, { code: 503, errorCode: 503, zh: '服务端更新中，暂不可用', en: 'Service Unavailable' }],
  ]),
};

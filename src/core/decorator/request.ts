import { Request } from 'express';
import { HTTP_HEADER } from '@/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** 获取 request 中的 用户信息 */
export const CurrentUser = createParamDecorator(
  (key?: unknown, ctx?: ExecutionContext) => {
    if (!ctx) return null;
    const request = ctx.switchToHttp().getRequest<Request>();
    return request['user'] || null;
  },
);

/** 获取 request-id */
export const CurrentRequestID = createParamDecorator(
  (key?: unknown, ctx?: ExecutionContext) => {
    if (!ctx) return null;
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.headers[HTTP_HEADER.REQUEST_ID] || null;
  },
);

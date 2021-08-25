import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** 获取 request 中的 user 对象 */
export const CurrentUser = createParamDecorator(
  (key: any, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (request['user']) {
      const user = request['user'] as any;
      if (key && user[key]) return user[key];
      return user;
    }
  },
);

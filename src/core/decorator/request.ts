import { Request } from 'express';
import { RequestPagination } from '@common/interface';
import { createParamDecorator, ExecutionContext, UnprocessableEntityException } from '@nestjs/common';

import { IPUtil } from '@library/utils';

/**
 * Get the pagination information injected in the current request object
 */
export const CurrentPage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const pagination: RequestPagination = { page: 1, pageSize: 10, order: 'id DESC' };

    if (request.query) {
      const { page, pageSize, order } = request.query;
      if (page) pagination.page = Number(page as string);
      if (order) pagination.order = order as string;
      if (pageSize) pagination.pageSize = Number(pageSize as string);
    }

    else if (request.query && request.query.pagination) {
      try {
        const { page, pageSize, order } = JSON.parse(request.query.pagination as string);
        if (page) pagination.page = page as number;
        if (order) pagination.order = order as string;
        if (pageSize) pagination.pageSize = pageSize as number;
      } catch (error) {
        throw new UnprocessableEntityException('pagination parse error');
      }
    }

    return pagination;
  },
);

/**
 * Gets the User property injected in the current Request object
 */
export const CurrentUser = createParamDecorator(
  (key: any, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request['user'] as any;
    const userInfo = user[key] as any;

    if (userInfo) return userInfo;
    if (user) return user;
    return null;
  },
);

/**
 * Get the IP information of the current client
 */
export const CurrentIP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const ip = IPUtil.getIp(request);
    return ip;
  },
);

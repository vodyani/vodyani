import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HTTP_STATUS } from '@/common';
import { Reflector } from '@nestjs/core';
import { WinstonLoggerProvider } from '@/extends/logger';
import { Inject, Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';

import { Redis, IMutexOptions } from '../common';
import { RedisClientFactoryProvider } from '../provider';

/** redis 单例客户端 互斥锁拦截器 */
@Injectable()
export class MutexInterceptor implements NestInterceptor {
  constructor(
    @Inject(RedisClientFactoryProvider.provide)
    private readonly redis: Redis.Redis,
    private readonly reflector: Reflector,
    private readonly logger: WinstonLoggerProvider,
  ) {}

  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<Record<string, any>>> {
    const request = ctx.switchToHttp().getRequest<Request>();

    const options = this.reflector.get<IMutexOptions>('MUTEX_OPTIONS', ctx.getHandler());

    if (options.fileds && options.fileds.length) {
      options.fileds.forEach(item => {
        if (request.headers[item]) options.key += `:${request.headers[item]}`;
        if (request.params[item]) options.key += `:${request.params[item]}`;
        if (request.query[item]) options.key += `:${request.query[item]}`;
        if (request.body[item]) options.key += `:${request.body[item]}`;
      });
    }

    // 10 秒内必须释放互斥锁
    let result = false;
    const ttl = options.ttl <= 10 ? options.ttl : 10;

    try {
      const isAllow = await this.redis.set(options.key, 1, 'EX', ttl, 'NX');
      this.logger.info('MutexInterceptor', options);
      if (isAllow === 'OK') result = true;
    } catch (error) {
      this.logger.error('MutexInterceptor', error);
      throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
    }

    if (!result) {
      throw new HttpException(
        options.errorMessage || '操作频繁，请稍后重试',
        options.errorCode || HTTP_STATUS.BAD_REQUEST,
      );
    }

    return next.handle().pipe(tap(
      () => {
        // 顺利完成业务逻辑后，即刻释放互斥锁
        this.redis.del(options.key);
      },
      (exception: HttpException) => {
        // 无论执行结果如何，都需要释放互斥锁
        this.redis.del(options.key);
        const code = exception instanceof HttpException ? exception.getStatus() : 500;
        const message = exception.message || '';
        throw new HttpException(message, code);
      }
    ));
  }
}

import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HTTP_STATUS } from '@/common';
import { Reflector } from '@nestjs/core';
import { WinstonLoggerProvider } from '@/extends/logger';
import { Inject, Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';

import { Redis, IMutexOptions } from '../common';
import { RedisClientFactoryProvider, RedisUtilsProvider } from '../provider';

/** redis 单例客户端 互斥锁拦截器 */
@Injectable()
export class MutexInterceptor implements NestInterceptor {
  constructor(
    @Inject(RedisClientFactoryProvider.provide)
    private readonly redis: Redis.Redis,
    private readonly reflector: Reflector,
    private readonly utils: RedisUtilsProvider,
    private readonly logger: WinstonLoggerProvider,
  ) {}

  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<Record<string, any>>> {
    const request = ctx.switchToHttp().getRequest<Request>();
    const params = { ...request.headers, ...request.params, ...request.query, ...request.body };
    const options = this.reflector.get<IMutexOptions>('MUTEX_OPTIONS', ctx.getHandler());

    let key = options.key;
    key = this.utils.matchKey(key, params);

    if (key) {
      // 10 秒内必须释放互斥锁
      let result = false;
      const ttl = options.ttl <= 10 ? options.ttl : 10;

      try {
        const isAllow = await this.redis.set(key, 1, 'EX', ttl, 'NX');
        this.logger.info('MutexInterceptor', options);
        if (isAllow === 'OK') result = true;
      } catch (error) {
        this.logger.error(error, 'MutexInterceptor', { options, params });
        throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
      }

      if (!result) {
        throw new HttpException(
          options.errorMessage || '操作频繁，请稍后重试',
          options.errorCode || HTTP_STATUS.BAD_REQUEST,
        );
      }
    } else {
      // 未能按规则完整匹配 Redis-Key
      this.logger.warn('MutexInterceptor.matchKey', { options, request });
    }

    return next.handle().pipe(tap(
      () => {
        if (key) {
          // 顺利完成业务逻辑后，即刻释放互斥锁
          this.redis.del(key);
        }
      },
      (exception: HttpException) => {
        if (key) {
          // 无论执行结果如何，都需要释放互斥锁
          this.redis.del(key);
          const code = exception instanceof HttpException ? exception.getStatus() : 500;
          const message = exception.message || '';
          throw new HttpException(message, code);
        }
      }
    ));
  }
}

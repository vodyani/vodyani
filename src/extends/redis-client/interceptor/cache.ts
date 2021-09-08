import { Request } from 'express';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HTTP_STATUS } from '@/common';
import { Reflector } from '@nestjs/core';
import { WinstonProvider } from '@/extends/logger';
import { Inject, Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';

import { Redis, ICacheOptions } from '../common';
import { ClusterClientFactoryProvider, RedisClientFactoryProvider, RedisUtilsProvider } from '../provider';

/** redis 单例客户端 缓存拦截器 */
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(RedisClientFactoryProvider.provide)
    private readonly redis: Redis.Redis,
    private readonly reflector: Reflector,
    private readonly utils: RedisUtilsProvider,
    private readonly logger: WinstonProvider,
  ) {}

  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<Record<string, any>>> {
    const request = ctx.switchToHttp().getRequest<Request>();
    const params = { ...request.headers, ...request.params, ...request.query, ...request.body };
    const options = this.reflector.get<ICacheOptions>('CACHE_OPTIONS', ctx.getHandler());

    let key = options.key;
    key = this.utils.matchKey(key, params);

    if (key) {
      try {
        const record = await this.redis.get(key);
        this.logger.info('CacheInterceptor', { options, params });
        if (record) return of(JSON.parse(record));
      } catch (error) {
        this.logger.error(error, 'CacheInterceptor', params);
        throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
      }
    } else {
      // 未能按规则完整匹配 Redis-Key
      this.logger.warn('CacheInterceptor.matchKey', { options, params });
    }

    return next.handle().pipe(map((body: Record<string, any>) => {
      if (key) {
        this.redis.set(key, JSON.stringify(body), 'EX', options.ttl);
      }

      return body;
    }));
  }
}

/** redis 集群客户端 缓存拦截器 */
@Injectable()
export class ClusterCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(ClusterClientFactoryProvider.provide)
    private readonly cluster: Redis.Cluster,
    private readonly reflector: Reflector,
    private readonly utils: RedisUtilsProvider,
    private readonly logger: WinstonProvider,
  ) {}

  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<Record<string, any>>> {
    const request = ctx.switchToHttp().getRequest<Request>();
    const params = { ...request.headers, ...request.params, ...request.query, ...request.body };
    const options = this.reflector.get<ICacheOptions>('CACHE_OPTIONS', ctx.getHandler());

    let key = options.key;
    key = this.utils.matchKey(key, params);

    if (key) {
      try {
        const record = await this.cluster.get(key);
        this.logger.info('ClusterCacheInterceptor', options);
        if (record) return of(JSON.parse(record));
      } catch (error) {
        this.logger.error(error, 'ClusterCacheInterceptor', params);
        throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
      }
    } else {
      // 未能按规则完整匹配 Redis-Key
      this.logger.warn('ClusterCacheInterceptor.matchKey', { options, params });
    }

    return next.handle().pipe(map((body: Record<string, any>) => {
      if (key) {
        this.cluster.set(key, JSON.stringify(body), 'EX', options.ttl);
      }

      return body;
    }));
  }
}

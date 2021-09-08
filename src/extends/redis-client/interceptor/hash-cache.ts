import { Request } from 'express';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HTTP_STATUS } from '@/common';
import { Reflector } from '@nestjs/core';
import { WinstonProvider } from '@/extends/logger';
import { Inject, Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';

import { Redis, IHashCacheOptions } from '../common';
import { ClusterClientFactoryProvider, RedisClientFactoryProvider, RedisUtilsProvider } from '../provider';

/** redis 单例客户端 Hash 缓存拦截器 */
@Injectable()
export class HashCacheInterceptor implements NestInterceptor {
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
    const options = this.reflector.get<IHashCacheOptions>('HASH_CACHE_OPTIONS', ctx.getHandler());

    let key = options.key;
    let hkey = options.hkey;
    key = this.utils.matchKey(key, params);
    hkey = this.utils.matchKey(hkey, params);

    if (hkey && key) {
      try {
        const record = await this.redis.hget(hkey, key);
        this.logger.info('HashCacheInterceptor', { options, params });
        if (record) return of(JSON.parse(record));
      } catch (error) {
        this.logger.error(error, 'HashCacheInterceptor', params);
        throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
      }
    } else {
      // 未能按规则完整匹配 Redis-Key
      this.logger.warn('HashCacheInterceptor.matchKey', { options, params });
    }

    return next.handle().pipe(map((body: Record<string, any>) => {
      if (hkey && key) {
        this.redis.hset(hkey, key, JSON.stringify(body));
      }

      return body;
    }));
  }
}

/** redis 集群客户端 Hash 缓存拦截器 */
@Injectable()
export class HashClusterCacheInterceptor implements NestInterceptor {
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
    const options = this.reflector.get<IHashCacheOptions>('HASH_CACHE_OPTIONS', ctx.getHandler());

    let key = options.key;
    let hkey = options.hkey;
    key = this.utils.matchKey(key, params);
    hkey = this.utils.matchKey(hkey, params);

    if (hkey && key) {
      try {
        const record = await this.cluster.hget(hkey, key);
        this.logger.info('HashClusterCacheInterceptor', { options, params });
        if (record) return of(JSON.parse(record));
      } catch (error) {
        this.logger.error(error, 'HashClusterCacheInterceptor', params);
        throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
      }
    } else {
      // 未能按规则完整匹配 Redis-Key
      this.logger.warn('HashClusterCacheInterceptor.matchKey', { options, params });
    }

    return next.handle().pipe(map((body: Record<string, any>) => {
      if (hkey && key) {
        this.cluster.hset(hkey, key, JSON.stringify(body));
      }

      return body;
    }));
  }
}

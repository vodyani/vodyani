import { Request } from 'express';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HTTP_STATUS } from '@/common';
import { Reflector } from '@nestjs/core';
import { WinstonLoggerProvider } from '@/extends/logger';
import { Inject, Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';

import { Redis, IHashCacheOptions } from '../common';
import { ClusterClientFactoryProvider, RedisClientFactoryProvider } from '../provider';

/** redis 单例客户端 Hash 缓存拦截器 */
@Injectable()
export class HashCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(RedisClientFactoryProvider.provide)
    private readonly redis: Redis.Redis,
    private readonly reflector: Reflector,
    private readonly logger: WinstonLoggerProvider,
  ) {}

  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<Record<string, any>>> {
    const request = ctx.switchToHttp().getRequest<Request>();

    const options = this.reflector.get<IHashCacheOptions>('HASH_CACHE_OPTIONS', ctx.getHandler());

    if (options.fileds && options.fileds.length) {
      options.fileds.forEach(item => {
        if (request.headers[item]) options.key += `:${request.headers[item]}`;
        if (request.params[item]) options.key += `:${request.params[item]}`;
        if (request.query[item]) options.key += `:${request.query[item]}`;
        if (request.body[item]) options.key += `:${request.body[item]}`;
      });
    }

    if (options.hashFileds && options.hashFileds.length) {
      options.hashFileds.forEach(item => {
        if (request.headers[item]) options.hashKey += `:${request.headers[item]}`;
        if (request.params[item]) options.hashKey += `:${request.params[item]}`;
        if (request.query[item]) options.hashKey += `:${request.query[item]}`;
        if (request.body[item]) options.hashKey += `:${request.body[item]}`;
      });
    }

    try {
      const record = await this.redis.hget(options.hashKey, options.key);
      this.logger.info('MutexInterceptor', options);
      if (record) return of(JSON.parse(record));
    } catch (error) {
      this.logger.error('HashCacheInterceptor', error);
      throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
    }

    return next.handle().pipe(map((body: Record<string, any>) => {
      this.redis.hset(options.hashKey, options.key, JSON.stringify(body));
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
    private readonly logger: WinstonLoggerProvider,
  ) {}

  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<Record<string, any>>> {
    const request = ctx.switchToHttp().getRequest<Request>();

    const options = this.reflector.get<IHashCacheOptions>('HASH_CACHE_OPTIONS', ctx.getHandler());

    if (options.fileds && options.fileds.length) {
      options.fileds.forEach(item => {
        if (request.headers[item]) options.key += `:${request.headers[item]}`;
        if (request.params[item]) options.key += `:${request.params[item]}`;
        if (request.query[item]) options.key += `:${request.query[item]}`;
        if (request.body[item]) options.key += `:${request.body[item]}`;
      });
    }

    if (options.hashFileds && options.hashFileds.length) {
      options.hashFileds.forEach(item => {
        if (request.headers[item]) options.hashKey += `:${request.headers[item]}`;
        if (request.params[item]) options.hashKey += `:${request.params[item]}`;
        if (request.query[item]) options.hashKey += `:${request.query[item]}`;
        if (request.body[item]) options.hashKey += `:${request.body[item]}`;
      });
    }

    try {
      const record = await this.cluster.hget(options.hashKey, options.key);
      this.logger.info('MutexInterceptor', options);
      if (record) return of(JSON.parse(record));
    } catch (error) {
      this.logger.error('HashClusterCacheInterceptor', error);
      throw new HttpException('操作失败，请稍后重试', HTTP_STATUS.BAD_REQUEST);
    }

    return next.handle().pipe(map((body: Record<string, any>) => {
      this.cluster.hset(options.hashKey, options.key, JSON.stringify(body));
      return body;
    }));
  }
}

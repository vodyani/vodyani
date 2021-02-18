import * as IoRedis from 'ioredis';

/**
 * global redis instance
 */
class Redis {
  /**
   * init redis instance
   */
  constructor(
    private readonly options?: IoRedis.RedisOptions
  ) {}

  /**
   * get redis instance
   */
  public async get(): Promise<IoRedis.Redis> {
    const redis = new IoRedis(this.options);
    return redis;
  }
}

/**
 * export namespace
 */
export {
  Redis, IoRedis,
};


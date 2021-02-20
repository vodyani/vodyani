import * as IoRedis from 'ioredis';

/**
 * redis instance
 */
export const getRedis = (options?: IoRedis.RedisOptions) => {
  return new IoRedis(options);
};

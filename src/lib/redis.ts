import * as IoRedis from 'ioredis';

export const getRedis = async (options: IoRedis.RedisOptions = null) => new IoRedis(options);

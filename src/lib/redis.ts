import { SuperRedis, RedisOptions } from '@sophons/redis';

export const getRedis = async (options: RedisOptions = null) => SuperRedis.init(options);

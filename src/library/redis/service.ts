import { SuperRedis } from '@sophons/redis';
import { ConfigService } from '@library/configs';

export class RedisService {

  public static local = 'localRedisClient';

  public static getProviders() {
    return [
      {
        provide: this.local,
        inject: [ConfigService],

        useFactory: async (configs: ConfigService) => {
          const redisClient = SuperRedis.init(configs.info.redis);
          return redisClient;
        },
      },
    ];
  }
}

import { SuperRedis } from '@sophons/redis';
import { ConfigService } from '@lib/configs';

export class RedisService {

  public static client = 'redisClient';

  public static getProviders() {
    return {
      provide: this.client,
      inject: [ConfigService],

      useFactory: async (configs: ConfigService) => {
        const redisClient = SuperRedis.init(configs.info.redis);
        return redisClient;
      },
    };
  }
}

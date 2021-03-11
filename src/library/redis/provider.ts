import { SuperRedis } from '@sophons/redis';
import { ConfigProvider } from '@library/configs';

export class RedisProvider {

  public static local = 'localRedis';

  public static getProviders() {
    return [
      {
        provide: this.local,
        inject: [ConfigProvider],

        useFactory: async (configs: ConfigProvider) => {
          const redisClient = new SuperRedis(configs.info.redis);
          return redisClient;
        },
      },
    ];
  }
}

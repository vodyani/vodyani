import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';

import { Redis } from '../common';

/** 工厂提供者 (支持异步加载) */
export class RedisClientFactoryProvider {
  public static readonly provide = 'RedisClient'

  public static getProvider() {
    return {
      provide: this.provide,
      inject: [ConfigFactoryProvider],
      useFactory: async (config: BaseConfig) => {
        const options = config.get('redis');
        return new Redis(options);
      },
    };
  }
}

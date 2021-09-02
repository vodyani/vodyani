import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';

import { Redis } from '../common';

/** 工厂提供者（支持异步加载） */
export class ClusterClientFactoryProvider {
  public static provide = 'RedisClusterClient'

  public static getProvider() {
    return {
      provide: this.provide,
      inject: [ConfigFactoryProvider],
      useFactory: async (config: BaseConfig) => {
        const { nodes, options } = config.get('redisCluster');
        return new Redis.Cluster(nodes, options);
      },
    };
  }
}

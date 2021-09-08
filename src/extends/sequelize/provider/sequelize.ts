import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';

import { SequelizeUtilsProvider } from './sequelize-utils';

/** 工厂提供者 (支持异步加载) */
export class SequelizeFactoryProvider {
  public static provide = 'SequelizeFactoryProvider'

  public static getProvider() {
    return {
      provide: this.provide,
      inject: [
        SequelizeUtilsProvider,
        ConfigFactoryProvider.provide,
      ],
      useFactory: async (
        utils: SequelizeUtilsProvider,
        config: BaseConfig
      ) => {
        const db = await utils.init(
          config.get('sequlize'),
          '',
          config.get('enableSequelizeSync'),
        );
        return db;
      },
    };
  }
}

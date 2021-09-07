import { Sequelize } from 'sequelize-typescript';
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
        /** 初始化链接 */
        const db = new Sequelize({
          ...config.get('sequlize'),
          modelMatch: utils.match,
          models: utils.pathMath(),
        });

        /** 根据配置决定是否开启表结构同步 */
        if (config.get('enableSequelizeSync')) await db.sync();

        return db;
      },
    };
  }
}

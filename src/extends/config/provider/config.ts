import { defaultsDeep } from 'lodash';
import { ENV, ENV_PARAM, STRBOOL } from '@/common';

import { IConfig, configMap } from '../common';

/** 配置基类 */
export class Config {
  private readonly info: IConfig;

  /** 实例化 */
  constructor(param: any) {
    /** 基础环境变量 */
    const settings = {
      pid: process.pid,
      env: process.env[ENV_PARAM.ENV] || ENV.DEV,
      port: Number(process.env[ENV_PARAM.PORT] || '3000'),
      name: process.env[ENV_PARAM.NAME] || 'NEST_HTTP_SERVER',
      enableSwagger: process.env[ENV_PARAM.ENABLE_SWAGGER] === STRBOOL.TRUE,
      enableSequelizeSync: process.env[ENV_PARAM.ENABLE_SEQUELIZE_SYNC] === STRBOOL.TRUE,
    };

    /** 聚合配置信息 */
    this.info =
      /** 合并项目内配置和异步输入配置 （以异步输入的参数为基准） */
      defaultsDeep(
        /** 合并默认配置和外部输入配置 （以基础环境变量为基准） */
        defaultsDeep(
          /** 合并默认配置和当前环境配置（以默认配置为基准） */
          defaultsDeep(
            configMap.get(settings.env),
            configMap.get(ENV.DEFAULT),
          ),
          settings,
        ),
        param,
      );
  }

  /** 全量返回 */
  public getAll(): IConfig {
    return this.info;
  }

  /** 按指定的键返回 */
  public get<K extends keyof IConfig>(key: K): IConfig[K] {
    return this.info[key];
  }
}

/** 工厂提供者（支持异步加载） */
export class ConfigFactoryProvider {
  public static provide = 'ConfigFactoryProvider'

  public static getProvider() {
    return {
      provide: this.provide,
      useFactory: async () => {
        /** 可以在异步实现方法中，获取外部输入的变量 */
        const config = new Config({});
        return config;
      },
    };
  }
}

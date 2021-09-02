import { defaultsDeep } from 'lodash';
import { ENV, ENV_PARAM, STRBOOL } from '@/common';

import { IConfig } from './interface';
import { configMap } from './constant';

/** 配置基类 */
export class BaseConfig {
  private readonly info: IConfig;

  constructor(param: Record<string, any>) {
    /** 收集外部输入的环境变量 */
    const settings = {
      pid: process.pid,
      env: process.env[ENV_PARAM.ENV] || ENV.DEV,
      name: process.env[ENV_PARAM.NAME] || 'Nest-Server',
      port: Number(process.env[ENV_PARAM.PORT] || '3000'),
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
  public get<Key extends keyof IConfig>(key: Key): IConfig[Key] {
    return this.info[key];
  }
}

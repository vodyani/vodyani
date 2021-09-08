import { defaultsDeep } from 'lodash';
import { ENV, ENV_PARAM } from '@/common';

import { IConfig } from './interface';
import { configMap } from './constant';

/** 配置基类 */
export class BaseConfig {
  private readonly info: IConfig;

  constructor() {
    /** 收集外部输入的环境变量 */
    const settings = {
      pid: process.pid,
      env: process.env[ENV_PARAM.ENV] || ENV.DEV,
      name: process.env[ENV_PARAM.NAME] || 'Nest-Server',
      port: Number(process.env[ENV_PARAM.PORT] || '3000'),
    };

    /** 聚合配置信息 */
    this.info = defaultsDeep(
      defaultsDeep(configMap.get(settings.env), configMap.get(ENV.DEFAULT)),
      settings,
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

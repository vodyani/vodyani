import { BaseConfig } from '../common';

/** 工厂提供者 (支持异步加载) */
export class ConfigFactoryProvider {
  public static readonly provide = 'ConfigFactoryProvider'

  public static getProvider() {
    return {
      provide: this.provide,
      useFactory: async () => {
        /** 可以在这里增加或者替换 `获取配置` 的逻辑，如查询配置中心 */
        const config = new BaseConfig();
        return config;
      },
    };
  }
}

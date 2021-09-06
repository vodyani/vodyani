import { BaseConfig } from '../common';

/** 工厂提供者（支持异步加载） */
export class ConfigFactoryProvider {
  public static provide = 'ConfigFactoryProvider'

  public static getProvider() {
    return {
      provide: this.provide,
      useFactory: async () => {
        /** 可以在这里，增加其他获取配置的逻辑，如配置中心 */
        const config = new BaseConfig({});
        return config;
      },
    };
  }
}

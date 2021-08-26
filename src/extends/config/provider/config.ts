import { BaseConfig } from '../common';

/** 工厂提供者（支持异步加载） */
export class ConfigFactoryProvider {
  public static provide = 'ConfigFactoryProvider'

  public static getProvider() {
    return {
      provide: this.provide,
      useFactory: async () => {
        /** 可以在异步实现方法中，获取外部输入的变量 */
        const config = new BaseConfig({});
        return config;
      },
    };
  }
}

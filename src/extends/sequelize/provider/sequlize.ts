import { resolve } from 'path';
import { readdirSync } from 'fs';
import { Sequelize } from 'sequelize-typescript';
import { Config, ConfigFactoryProvider } from '@/extends/config';

class SequelizeEntity {
  /** 匹配 Entity 命名 */
  public static match(filename: string, member: string) {
    const realName = filename
      .split('-')
      .join('')
      .toLocaleLowerCase();

    return realName === member.toLocaleLowerCase();
  }

  /** 匹配 Entity 文件路径 */
  static pathMath() {
    const path = resolve(__dirname, '../shared');
    const list = readdirSync(path).filter(e => !e.includes('index.'));
    return (list || []).map(e => `${path}/${e}`);
  }
}

/** 工厂提供者（支持异步加载） */
export class SequelizeFactoryProvider {
  public static provide = 'SequelizeFactoryProvider'

  public static getProvider() {
    return {
      provide: this.provide,
      inject: [ConfigFactoryProvider.provide],
      useFactory: async (config: Config) => {
        /** 初始化链接 */
        const db = new Sequelize({
          ...config.get('sequlize'),
          modelMatch: SequelizeEntity.match,
          models: SequelizeEntity.pathMath(),
        });

        /** 根据配置决定是否开启表结构同步 */
        if (config.get('enableSequelizeSync')) await db.sync();

        return db;
      },
    };
  }
}


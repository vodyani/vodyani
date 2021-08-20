import { globalPath } from '@/common';
import { Sequelize } from 'sequelize-typescript';
import { Config, ConfigFactoryProvider } from '@/extends/config';

export class DefaultMysql {
  /** 自定义提供者 */
  static provide = 'DEFAULT_MYSQL'

  /** 异步加载连接池 */
  static async useFactory(config: Config) {
    const options = {
      ...config.get('sequlize'),

      models: [`${globalPath.extends}/sequelize/shared/*.entity.*`],

      modelMatch: (filename: string, member: string) => {
        const realName = filename
          .substring(0, filename.indexOf('.entity'))
          .split('-')
          .join('')
          .toLocaleLowerCase();

        return realName === member.toLocaleLowerCase();
      },
    };

    const db = new Sequelize(options);

    /** 根据配置决定是否开启表结构同步 */
    if (config.get('enableSequelizeSync')) await db.sync();

    return db;
  }
}

export class SequelizeProvider {
  /** 初始化连接 */
  public static getProviders() {
    return [
      {
        inject: [ConfigFactoryProvider.provide],
        provide: DefaultMysql.provide,
        useFactory: DefaultMysql.useFactory,
      },
    ];
  }
}

import { resolve } from 'path';
import { readdirSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

/** 普通提供者 */
@Injectable()
export class SequelizeUtilsProvider {
  /**
   * 匹配 Entity 命名
   *
   * @param filename Entity 文件名
   * @param member Entity 文件内对外导出的 class Name
   */
  public matchName(filename: string, member: string) {
    const realName = filename
      .split('-')
      .join('')
      .toLocaleLowerCase();

    return realName === member.toLocaleLowerCase();
  }

  /**
   * 匹配 Entity 文件路径
   *
   * @param sharedPath Entity 文件在 shared 目录的路径，默认为 ''
   */
  public getPath(sharedPath: string) {
    const path = resolve(__dirname, `../shared${sharedPath}`);
    const list = readdirSync(path).filter(e => !e.includes('index.'));
    return (list || []).map(e => `${path}/${e}`);
  }

  /**
   * 初始化 sequelize 连接池
   *
   * @param options SequelizeOptions
   * @param sharedPath Entity 文件在 shared 目录的路径，默认为 ''
   * @param enableSync 是否开启表结构同步，默认为 false
   */
  public async init(
    options: SequelizeOptions,
    sharedPath = '',
    enableSync = false,
  ): Promise<Sequelize> {
    /** 初始化链接 */
    const setting: SequelizeOptions = {
      timezone: '+08:00',
      dialect: 'mysql',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    };

    /** 传入路径才会执行匹配 */
    if (sharedPath) {
      setting.modelMatch = this.matchName;
      setting.models = this.getPath(sharedPath);
    }

    const sequelize = new Sequelize({
      ...setting,
      ...options,
    });

    /** 根据配置决定是否开启表结构同步 */
    if (enableSync) await sequelize.sync();

    return sequelize;
  }

}

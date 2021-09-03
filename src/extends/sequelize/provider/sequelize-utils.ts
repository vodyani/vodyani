import { resolve } from 'path';
import { readdirSync } from 'fs';
import { Injectable } from '@nestjs/common';

/** 普通提供者 */
@Injectable()
export class SequelizeUtilsProvider {
  /** 匹配 Entity 命名 */
  public match(filename: string, member: string) {
    const realName = filename
      .split('-')
      .join('')
      .toLocaleLowerCase();

    return realName === member.toLocaleLowerCase();
  }

  /** 匹配 Entity 文件路径 */
  public pathMath() {
    const path = resolve(__dirname, '../shared');
    const list = readdirSync(path).filter(e => !e.includes('index.'));
    return (list || []).map(e => `${path}/${e}`);
  }
}

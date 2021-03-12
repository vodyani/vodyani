import { ENV } from '@common/type';
import { defaultsDeep } from 'lodash';
import { Injectable } from '@nestjs/common';
import { envConstant } from '@common/constant';

import { dev, test, pre, prod, defaults, Configs } from './shared';

@Injectable()
export class ConfigProvider {

  public readonly info: Configs;

  constructor() {
    const port = process.env[envConstant.port] || '3000';
    const env = process.env[envConstant.env] as ENV || 'dev';
    const appName = process.env[envConstant.appName] || 'Nest-Server';

    this.info = {
      env,
      appName,
      port: Number(port),
      ...defaultsDeep({ dev, test, pre, prod }[env], defaults),
    };
  }
}

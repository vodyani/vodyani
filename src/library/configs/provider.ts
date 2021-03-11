import { defaultsDeep } from 'lodash';
import { Injectable } from '@nestjs/common';
import { ENV, envConstant, Configs } from '@common';

import { dev, test, pre, prod, defaults } from './shared';

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

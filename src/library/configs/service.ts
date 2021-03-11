import { defaultsDeep } from 'lodash';
import { Injectable } from '@nestjs/common';
import { ENV, envParamNames, Configs } from '@common';

import { common } from './common';
import { dev } from './config.dev';
import { pre } from './config.pre';
import { test } from './config.test';
import { prod } from './config.prod';

@Injectable()
export class ConfigService {

  public readonly info: Configs;

  constructor() {
    const port = process.env[envParamNames.port] || '3000';
    const env = process.env[envParamNames.env] as ENV || 'dev';
    const appName = process.env[envParamNames.appName] || 'Nest-Server';

    this.info = {
      env,
      appName,
      port: Number(port),
      ...defaultsDeep({ dev, test, pre, prod }[env], common),
    };
  }
}

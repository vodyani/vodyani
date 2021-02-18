import { dev } from './dev';
import { pre } from './pre';
import { test } from './test';
import { prod } from './prod';
import { common } from './common';
import { GlobalConfigs } from './interface';

/**
 * get env from process
 */
const { NODE_ENV = 'dev', NODE_PORT = 3000, NODE_APP_NAME = 'api' } = process.env;

/**
 * get global configs
 */
class Configs {
  constructor(
    public readonly env: string = NODE_ENV,
    public readonly appname: string = NODE_APP_NAME,
    public readonly port: string | number = NODE_PORT,
  ) {}

  public async get(): Promise<GlobalConfigs> {
    const dict = { dev, test, pre, prod };

    return {
      env: this.env,
      port: this.port,
      appname: this.appname,
      ...common,
      ...dict[this.env],
    };
  }
}

export { Configs, GlobalConfigs };


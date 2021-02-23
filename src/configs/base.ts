import { common } from './common';
import { dev } from './config.dev';
import { pre } from './config.pre';
import { test } from './config.test';
import { prod } from './config.prod';
import { Configs } from './interface';

/**
 * get env from process
 */
const { NODE_ENV = 'dev', NODE_PORT = 3000, NODE_APP_NAME = 'api' } = process.env;

/**
 * get global configs
 */
export const getConfigs = async (
  env: string = NODE_ENV,
  appname: string = NODE_APP_NAME,
  port: string | number = NODE_PORT,
) : Promise<Configs> => {
  const dict = { dev, test, pre, prod };
  return { env, port, appname, ...common, ...dict[env] };
};

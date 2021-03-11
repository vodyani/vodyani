import { resolve } from 'path';

export const pathConstant = {
  src: resolve(__dirname, '../../'),
  logs: resolve(__dirname, '../../logs'),
};

export const envConstant = {
  env: 'NODE_ENV',
  port: 'NODE_PORT',
  appName: 'NODE_APP_NAME',
};

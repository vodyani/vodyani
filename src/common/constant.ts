import { resolve } from 'path';

const srcPath = resolve(__dirname, '../');
const rootPath = resolve(__dirname, '../../');

export const pathConstant = {
  // src
  // --------------------------
  src: srcPath,
  common: `${srcPath}/common`,
  entity: `${srcPath}/entity`,
  library: `${srcPath}/library`,
  modules: `${srcPath}/modules`,

  // root
  // --------------------------
  root: rootPath,
  logs: `${rootPath}/logs`,
};

export const envConstant = {
  env: 'NODE_ENV',
  port: 'NODE_PORT',
  appName: 'NODE_APP_NAME',
};

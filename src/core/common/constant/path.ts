import { resolve } from 'path';

export const srcPath = resolve(__dirname, '../../../');
export const rootPath = resolve(__dirname, '../../../../');
export const tempPath = `${rootPath}/temp`;
export const tempLogPath = `${tempPath}/logs`;
export const publicPath = `${rootPath}/public`;
export const resourcePath = `${rootPath}/resource`;
export const configPath = `${resourcePath}/config`;

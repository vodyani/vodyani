import { resolve } from 'path';

/**
 * Define the root directory path
 */
export const rootPath = resolve(__dirname, '../../../../');
/**
 * Define the src directory path
 */
export const srcPath = `${resolve(__dirname, '../../../')}`;
/**
 * Define the temp file directory path
 */
export const tempPath = `${rootPath}/temp`;
/**
 * Define the logs file directory path
 */
export const logsPath = `${rootPath}/logs`;
/**
 * Define the public file directory path
 */
export const publicPath = `${rootPath}/public`;
/**
 * Define the resource directory path
 */
export const resourcePath = `${rootPath}/resource`;
/**
 * Define the resource config env directory path
 */
export const configPath = `${resourcePath}/config`;
/**
 * Define the resource worker handler directory path
 */
export const workerPath = `${resourcePath}/worker`;

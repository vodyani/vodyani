import { SLS } from '@acheetahk/cloudtools';

/**
 * Init logger
 */
interface LoggerParams {
  env: string;
  appname: string;
  options: SLS.SLSType.SLSOptions;
}

/**
 * logger instance
 */
export const getLogger = (params?: LoggerParams) => {

  return params && params.env !== 'dev'
    ? new SLS.SLSLogger(params.appname, params.options)
    : new SLS.SimpleLogger();
};

import { SLS } from '@acheetahk/cloudtools';

/**
 * global logger instance
 */
class Logger {
  /**
   * init logger instance
   */
  constructor(
    private env: string = 'dev',
    private appname: string = 'api',
    private options: SLS.SLSType.SLSOptions = null,
  ) {}

  /**
   * get logger instance
   */
  public async get(): Promise<SLS.SLSLogger | SLS.SimpleLogger> {
    return this.env !== 'dev'
      ? new SLS.SLSLogger(this.appname, this.options)
      : new SLS.SimpleLogger();
  }
}

/**
 * export namespace
 */
export {
  Logger, SLS,
};

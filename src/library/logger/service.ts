import * as winston from 'winston';

import { resolve } from 'path';
import { Injectable, LoggerService } from '@nestjs/common';
import { LoggerOptions, envParamNames, ENV } from '@common';

/**
 * Use Winston as the default logging processor for your project
 */
@Injectable()
export class Logger implements LoggerService {
  /**
   * winston logger
   */
  private readonly instance: winston.Logger;

  public constructor() {
    const env = process.env[envParamNames.env] as ENV || 'dev';
    const appName = process.env[envParamNames.appName] || 'Nest-Server';

    this.instance = winston.createLogger(this.getConfigs({ env, appName }));
  }

  /**
   * Log output method
   */
  public log = (message: string) => this.instance.info(message);
  public info = (message: string) => this.instance.info(message);
  public warn = (message: string) => this.instance.warn(message);
  public debug = (message: string) => this.instance.debug(message);
  public error = (message: string) => this.instance.error(message);

  /**
   * Formatted print output
   */
  private readonly format = (info: winston.Logform.TransformableInfo, env: ENV, appName: string) => {
    const pid = process.pid;
    const message = info.message;
    const timestamp = info.timestamp;
    const level = info.level.toLocaleUpperCase();

    return `[${appName}] ${pid} - ${timestamp} [${env}] ${level}: ${message}`;
  }

  /**
   * Get Winston configuration information
   */
  private readonly getConfigs = (options: LoggerOptions): winston.LoggerOptions => {
    const { env, appName } = options;

    // The local development environment does not log files
    const silent = options.env === 'dev';
    const dirname = resolve(__dirname, '../../../logs');

    return {
      exitOnError: false,
      handleExceptions: true,
      exceptionHandlers: new winston.transports.File({ dirname, filename: 'stderr.log' }),

      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(message => this.format(message, env, appName)),
            winston.format.colorize({ all: true }),
          ),
        }),
        new winston.transports.File({
          silent,
          dirname,
          level: 'info',
          filename: 'stdout.log',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(message => this.format(message, env, appName)),
          ),
        }),
        new winston.transports.File({
          silent,
          dirname,
          level: 'error',
          filename: 'stderr.log',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(info => this.format(info, env, appName)),
          ),
        }),
      ],
    };
  };
}

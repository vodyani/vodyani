import { globalPath } from '@/common';
import { Config, ConfigFactoryProvider } from '@/extends/config';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logform, Logger, createLogger, format, LoggerOptions, transports } from 'winston';

@Injectable()
export class WinstonLoggerProvider implements LoggerService {
  private readonly instance: Logger;

  constructor(
    @Inject(ConfigFactoryProvider.provide)
    private readonly config: Config,
  ) {
    this.instance = createLogger(this.getOptions());
  }

  private format(info: Logform.TransformableInfo) {
    const pid = this.config.get('pid');
    const env = this.config.get('env');
    const name = this.config.get('name');
    const message = info.message;
    const timestamp = info.timestamp;
    const level = info.level.toLocaleUpperCase();

    return `[${name}] ${pid} - ${timestamp} [${env}] ${level}: ${message}`;
  }

  private getOptions(): LoggerOptions {
    const dirname = globalPath.logs;

    return {
      exitOnError: false,
      handleExceptions: true,
      exceptionHandlers: new transports.File({ dirname, filename: 'stderr.log' }),
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(message => this.format(message)),
            format.colorize({ all: true }),
          ),
        }),
        new transports.File({
          dirname,
          level: 'info',
          filename: 'stdout.log',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(message => this.format(message)),
          ),
        }),
        new transports.File({
          dirname,
          level: 'error',
          filename: 'stderr.log',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(message => this.format(message)),
          ),
        }),
      ],
    };
  }

  public log = (message: string) => this.instance.info(message);
  public info = (message: string) => this.instance.info(message);
  public warn = (message: string) => this.instance.warn(message);
  public debug = (message: string) => this.instance.debug(message);
  public error = (message: string) => this.instance.error(message);
}

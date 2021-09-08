import { path } from '@/common';
import 'winston-daily-rotate-file';
import { DailyRotateFile } from 'winston/lib/winston/transports';
import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';
import { HttpException, Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logform, Logger, createLogger, format, LoggerOptions, transports } from 'winston';

@Injectable()
export class WinstonProvider implements LoggerService {
  private readonly instance: Logger;

  constructor(
    @Inject(ConfigFactoryProvider.provide)
    private readonly config: BaseConfig,
  ) {
    this.instance = createLogger(this.initOptions());
  }

  // 格式化输出样式
  private format(info: Logform.TransformableInfo): string {
    const pid = this.config.get('pid');
    const env = this.config.get('env');
    const name = this.config.get('name');
    const message = info.message;
    const timestamp = info.timestamp;
    const level = info.level.toLocaleUpperCase();
    return `[${name}] ${pid} - ${timestamp} [${env}] ${level}: ${message}`;
  }

  // 构建基本配置
  private initOptions(): LoggerOptions {
    const dirname = path.logs;

    const consoleLogger = new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(message => this.format(message)),
        format.colorize({ all: true }),
      ),
    });

    const stdoutLogger = new DailyRotateFile({
      dirname,
      level: 'info',
      filename: '%DATE%-stdout.log',
      datePattern: `YYYY-MM-DD-HH`,
      zippedArchive: true,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(message => this.format(message)),
      ),
    });

    const stderrLogger = new DailyRotateFile({
      dirname,
      level: 'error',
      filename: '%DATE%-stderr.log',
      datePattern: `YYYY-MM-DD-HH`,
      zippedArchive: true,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(message => this.format(message)),
      ),
    });

    return {
      exitOnError: false,
      handleExceptions: true,
      exceptionHandlers: stderrLogger,
      transports: [consoleLogger, stdoutLogger, stderrLogger],
    };
  }

  /**
   * Method - LOG - 常规
   * @param trace string 日志标记，用于快速检索内容
   * @param meta any 日志数据源 (允许为空)
   */
  public log(trace: string, meta?: any) {
    const data = meta ? { trace, meta, type: 'LOG' } : trace;
    this.instance.info(JSON.stringify(data));
  }

  /**
   * Method - INFO - 常规
   * @param trace string 日志标记，用于快速检索内容
   * @param meta any 日志数据源 (允许为空)
   */
  public info(trace: string, meta?: any) {
    const data = meta ? { trace, meta, type: 'INFO' } : trace;
    this.instance.info(JSON.stringify(data));
  }

  /**
   * Method - WARN - 警告
   * @param trace string 日志标记，用于快速检索内容
   * @param meta any 日志数据源 (允许为空)
   */
  public warn(trace: string, meta?: any) {
    const data = meta ? { trace, meta, type: 'WARN' } : trace;
    this.instance.warn(JSON.stringify(data));
  }

  /**
   * Method - WARN - 警告
   * @param error HttpException 异常类，记录了异常触发时的堆栈信息
   * @param trace string 日志标记，用于快速检索内容
   * @param meta any 日志数据源 (允许为空)
   */
  public error(error: HttpException, trace: string, meta?: any) {
    const exception = {
      error: error.message,
      stack: error.stack,
      name: error.name,
      type: 'ERROR',
      trace,
    };

    const data = meta ? { meta, ...exception } : exception;
    this.instance.error(JSON.stringify(data));
  }
}

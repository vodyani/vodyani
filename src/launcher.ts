import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ArkManager, ConfigProvider } from '@vodyani/ark';
import { DocumentBuilder, SwaggerProvider } from '@vodyani/swagger';
import { Logger } from '@vodyani/winston';

import { Container } from './container';

import { Configuration } from '@/infrastructures/config/common';
import { ResponseFormatInterceptor, ResponseSnakeCaseInterceptor } from '@/infrastructures/convertor/interceptor';
import { DtoCamelCasePipe } from '@/infrastructures/convertor/pipe';
import { RequestExceptionFilter } from '@/infrastructures/logger/filter';
import { RequestLogInterceptor } from '@/infrastructures/logger/interceptor';
import { LoggerManager } from '@/infrastructures/logger/manager';
import { DtoValidatePipe } from '@/infrastructures/validator/pipe';

export class Launcher {
  private app: INestApplication;

  public async run() {
    await this.initContainer();

    this.useAOP();
    this.useSwagger();

    this.uncaughtException();
    this.listenPort();
  }

  private async initContainer() {
    this.app = await NestFactory.create(Container, { cors: true, logger: ['error'] });
  }

  private useAOP() {
    const logger = this.app.get(LoggerManager.getToken());
    const dtoValidatePipe = this.app.get(DtoValidatePipe);
    const dtoCamelCasePipe = this.app.get(DtoCamelCasePipe);
    const requestLogInterceptor = this.app.get(RequestLogInterceptor);
    const requestExceptionFilter = this.app.get(RequestExceptionFilter);
    const responseFormatInterceptor = this.app.get(ResponseFormatInterceptor);
    const responseSnakeCaseInterceptor = this.app.get(ResponseSnakeCaseInterceptor);

    this.app.useLogger(logger);
    this.app.useGlobalFilters(requestExceptionFilter);
    this.app.useGlobalPipes(dtoValidatePipe, dtoCamelCasePipe);
    this.app.useGlobalInterceptors(requestLogInterceptor, responseFormatInterceptor, responseSnakeCaseInterceptor);
  }

  private useSwagger() {
    const config = this.app.get<ConfigProvider<Configuration>>(ArkManager.getToken());
    const { enable, path } = config.get('swagger');

    if (enable) {
      this.app
        .get<SwaggerProvider>(SwaggerProvider)
        .setConfig(new DocumentBuilder().build())
        .setNestApplication(this.app)
        .setPath(path)
        .setup();
    }
  }

  private uncaughtException() {
    const logger = this.app.get<Logger>(LoggerManager.getToken());

    const listener = (source: string) => {
      return (error: Error) => logger.error(error, {}, source);
    };

    process.on('uncaughtException', listener('uncaughtException'));
    process.on('unhandledRejection', listener('unhandledRejection'));
  }

  private async listenPort() {
    const config = this.app.get<ConfigProvider<Configuration>>(ArkManager.getToken());
    const logger = this.app.get<Logger>(LoggerManager.getToken());
    const port = config.get('port');

    await this.app.listen(port);

    logger.info(`Vodyani Listen: http://localhost:${port} 🚀`);
  }
}

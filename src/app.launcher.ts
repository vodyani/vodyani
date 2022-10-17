import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ArkManager, ConfigProvider } from '@vodyani/ark';
import { DocumentBuilder, SwaggerProvider } from '@vodyani/swagger';
import { Logger } from '@vodyani/winston';

import { Container } from './app.container';

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
    this.app = await NestFactory.create(Container, { cors: true, logger: ['error'] });

    this.uncaughtException();
    this.useGlobalLogger();
    this.useGlobalAOP();
    this.useSwagger();
    this.start();
  }

  private uncaughtException() {
    const logger = this.app.get<Logger>(LoggerManager.getToken());

    process.on('uncaughtException', logger.error);
    process.on('unhandledRejection', logger.error);
  }

  private useGlobalLogger() {
    const logger = this.app.get(LoggerManager.getToken());

    this.app.useLogger(logger);
  }

  private useGlobalAOP() {
    const dtoValidatePipe = this.app.get(DtoValidatePipe);
    const dtoCamelCasePipe = this.app.get(DtoCamelCasePipe);
    const requestLogInterceptor = this.app.get(RequestLogInterceptor);
    const requestExceptionFilter = this.app.get(RequestExceptionFilter);
    const responseFormatInterceptor = this.app.get(ResponseFormatInterceptor);
    const responseSnakeCaseInterceptor = this.app.get(ResponseSnakeCaseInterceptor);

    this.app.useGlobalFilters(
      requestExceptionFilter,
    );

    this.app.useGlobalPipes(
      dtoValidatePipe,
      dtoCamelCasePipe,
    );

    this.app.useGlobalInterceptors(
      requestLogInterceptor,
      responseSnakeCaseInterceptor,
      responseFormatInterceptor,
    );
  }

  private useSwagger() {
    const config = this.app.get<ConfigProvider<Configuration>>(ArkManager.getToken());
    const { enable, path } = config.search('swagger');

    if (enable) {
      this.app.get<SwaggerProvider>(SwaggerProvider)
        .setConfig(new DocumentBuilder().build())
        .setNestApplication(this.app)
        .setPath(path)
        .setup();
    }
  }

  private async start() {
    const config = this.app.get<ConfigProvider<Configuration>>(ArkManager.getToken());
    const logger = this.app.get<Logger>(LoggerManager.getToken());
    const { enable, path } = config.search('swagger');
    const port = config.search('port');

    await this.app.listen(port);

    logger.info(`Vodyani Listen: http://localhost:${port} 🚀`);

    if (enable) {
      logger.info(`Vodyani Swagger: http://localhost:${port}/${path} 📚`);
    }
  }
}

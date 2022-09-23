import { ArkManager, ConfigProvider } from '@vodyani/ark';
import { INestApplication, NestFactory } from '@vodyani/core';
import { SwaggerProvider } from '@vodyani/swagger';
import { Logger } from '@vodyani/winston';

import { Container } from './container';
import { Configuration } from './infrastructures/config/common';
import { ResponseFormatInterceptor, ResponseSnakeCaseInterceptor } from './infrastructures/convertor/interceptor';
import { DtoCamelCasePipe } from './infrastructures/convertor/pipe';
import { RequestExceptionFilter } from './infrastructures/logger/filter';
import { RequestLogInterceptor } from './infrastructures/logger/interceptor';
import { LoggerManager } from './infrastructures/logger/manager';
import { DtoValidatePipe } from './infrastructures/validator/pipe';

export class Launcher {
  private app: INestApplication;

  public async run() {
    await this.init();

    this.useAOP();
    this.useSwagger();

    this.uncaughtException();
    this.listenPort();
  }

  private async init() {
    this.app = await NestFactory.create(Container, { cors: true, logger: ['error'] });
  }

  private useAOP() {
    const dtoValidatePipe = this.app.get(DtoValidatePipe);
    const dtoCamelCasePipe = this.app.get(DtoCamelCasePipe);
    const logger = this.app.get<Logger>(LoggerManager.getToken());
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
      const swagger = this.app.get<SwaggerProvider>(SwaggerProvider);
      const options = swagger.getConfigBuilder().build();
      swagger.setup(path, this.app, options);
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

    const { path } = config.get('swagger');
    const port = config.get('port');

    await this.app.listen(port);

    logger.info(`Vodyani Listen: http://localhost:${port} 🚀`);
    logger.info(`Vodyani Swagger: http://localhost:${port}/${path} 📚`);
  }
}

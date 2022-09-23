import { ArkManager, ConfigProvider } from '@vodyani/ark';
import { NestFactory } from '@vodyani/core';
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

export async function bootstrap() {
  const app = await NestFactory.create(Container, { cors: true, logger: ['error'] });

  const config = app.get<ConfigProvider<Configuration>>(ArkManager.getToken());
  const logger = app.get<Logger>(LoggerManager.getToken());

  const { enable } = config.get('swagger');
  const port = config.get('port');

  if (enable) {
    const path = 'docs';
    const swagger = app.get(SwaggerProvider);

    swagger.setup(path, app, swagger.getConfigBuilder().build());

    logger.info(`Nest Swagger: http://localhost:${port}/${path} `);
  }

  process.on('uncaughtException', logger.error);
  process.on('unhandledRejection', logger.error);

  app.useLogger(logger);
  app.useGlobalFilters(app.get(RequestExceptionFilter));
  app.useGlobalPipes(app.get(DtoValidatePipe));
  app.useGlobalPipes(app.get(DtoCamelCasePipe));
  app.useGlobalInterceptors(app.get(RequestLogInterceptor));
  app.useGlobalInterceptors(app.get(ResponseSnakeCaseInterceptor));
  app.useGlobalInterceptors(app.get(ResponseFormatInterceptor));

  await app.listen(port);

  logger.info(`Nest Listen: http://localhost:${port} 🚀 `);
}

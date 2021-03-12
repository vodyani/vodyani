import * as helmet from 'helmet';

import { DtoPipe } from '@core/pipe';
import { CoreModule } from '@core/module';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ExceptionCatchFilter } from '@core/filter';
import { LoggerProvider, LoggerModule } from '@library/logger';
import { ConfigModule, ConfigProvider } from '@library/configs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogInterceptor, FormatInterceptor } from '@core/interceptor';

/**
 * Create Nest Server Application.
 */
export const createServer = async () => {
  const app = await NestFactory.create(CoreModule, { cors: true });
  const configs = app.select(ConfigModule).get(ConfigProvider);
  const logger = app.select(LoggerModule).get(LoggerProvider);
  const iocContext = app.select(CoreModule);

  app.use(helmet());
  app.useLogger(logger);
  app.useGlobalPipes(iocContext.get(DtoPipe));
  app.useGlobalFilters(iocContext.get(ExceptionCatchFilter));
  app.useGlobalInterceptors(iocContext.get(LogInterceptor), iocContext.get(FormatInterceptor));

  if (configs.info.env !== 'prod') await createSwagger(app);

  await app.listen(configs.info.port);
  logger.info(`${configs.info.appName} START WITH PORT: ${configs.info.port} 🚀 `);
};

/**
 * Create swagger document.
 */
export const createSwagger = async (app: INestApplication) => {
  const document = new DocumentBuilder().setTitle('server').build();
  const documentServer = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/doc', app, documentServer);
};

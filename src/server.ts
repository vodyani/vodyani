import * as helmet from 'helmet';

import { CoreModule } from '@modules/core';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { LoggerProvider, LoggerModule } from '@library/logger';
import { ConfigModule, ConfigProvider } from '@library/configs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DtoPipe, ExceptionCatchFilter, FormatInterceptor, LogInterceptor } from '@library/core';

/**
 * Create Nest Server Application
 */
export const createServer = async () => {
  const app = await NestFactory.create(CoreModule, { cors: true });
  const configs = app.select(ConfigModule).get(ConfigProvider);
  const logger = app.select(LoggerModule).get(LoggerProvider);
  const context = app.select(CoreModule);

  app.use(helmet());
  app.useLogger(logger);
  app.useGlobalPipes(context.get(DtoPipe));
  app.useGlobalFilters(context.get(ExceptionCatchFilter));
  app.useGlobalInterceptors(context.get(LogInterceptor), context.get(FormatInterceptor));

  if (configs.info.env !== 'prod') createSwagger(app);

  await app.listen(configs.info.port);

  logger.info(`${configs.info.appName} START WITH PORT: ${configs.info.port} 🚀 `);
};

/**
 * Create swagger document.
 */
export const createSwagger = (app: INestApplication) => {
  const document = new DocumentBuilder().setTitle('server').build();
  const documentServer = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/doc', app, documentServer);
};

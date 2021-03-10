import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { CoreModule } from '@modules/core';
import { INestApplication } from '@nestjs/common';
import { Logger, LoggerModule } from '@lib/logger';
import { ConfigModule, ConfigService } from '@lib/configs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DtoPipe, ExceptionCatchFilter, FormatInterceptor, LogInterceptor } from '@lib/core';

/**
 * Create swagger document.
 */
export const createSwagger = (app: INestApplication) => {
  const document = new DocumentBuilder().setTitle('server').build();
  const documentServer = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/doc', app, documentServer);
};

/**
 * Start and bind the IOC module and the Global Store
 */
export const createServer = async () => {
  const app = await NestFactory.create(CoreModule, { cors: true, logger: true });
  const configs = app.select(ConfigModule).get(ConfigService, { strict: true });
  const logger = app.select(LoggerModule).get(Logger, { strict: true });

  if (configs.info.env !== 'prod') createSwagger(app);

  app.use(helmet());
  app.useLogger(logger);
  app.useGlobalPipes(app.select(CoreModule).get(DtoPipe, { strict: true }));
  app.useGlobalFilters(app.select(CoreModule).get(ExceptionCatchFilter, { strict: true }));
  app.useGlobalInterceptors(app.select(CoreModule).get(LogInterceptor, { strict: true }));
  app.useGlobalInterceptors(app.select(CoreModule).get(FormatInterceptor, { strict: true }));

  await app.listen(configs.info.port);
  logger.info(`🚀 SERVER START WITH PORT: ${configs.info.port} 🚀 `);
};

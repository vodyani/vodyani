import { Logger } from '@vodyani/winston';
import { NestFactory } from '@vodyani/core';
import { SwaggerProvider } from '@vodyani/swagger';
import { ArkManager, ConfigProvider } from '@vodyani/ark';

import { AppContainer } from './app.container';

import { Configuration } from '@/infrastructure/config/common';
import { LoggerManager } from '@/infrastructure/logger/manager';

export async function bootstrap() {
  const app = await NestFactory.create(AppContainer, { cors: true, logger: ['error'] });

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

  // Use middleware
  app.useLogger(logger);

  await app.listen(port);

  logger.info(`Nest Listen: http://localhost:${port} 🚀 `);
}

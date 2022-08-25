import { getToken } from '@vodyani/core';
import { Logger } from '@vodyani/winston';
import { NestFactory } from '@nestjs/core';
import { ArkManager, ConfigProvider } from '@vodyani/ark';

import { CoreContainer } from './container';

import { Configuration } from '@/infrastructure/config/common';
import { LoggerManager } from '@/infrastructure/logger/manager';
import { SwaggerProvider } from '@/infrastructure/swagger/provider';

export async function bootstrap() {
  const app = await NestFactory.create(CoreContainer, { cors: true, logger: ['error'] });

  const config = app.get<ConfigProvider<Configuration>>(getToken(ArkManager));
  const logger = app.get<Logger>(getToken(LoggerManager));

  const { enable } = config.get('swagger');
  const port = config.get('port');

  if (enable) {
    const swagger = app.get(SwaggerProvider);
    swagger.setup('docs', app, swagger.getConfigBuilder().build());
  }

  process.on('uncaughtException', logger.error);
  process.on('unhandledRejection', logger.error);

  // Use middleware
  app.useLogger(logger);

  await app.listen(port);

  logger.info(`LISTEN: http://localhost:${port} 🚀 `);
}

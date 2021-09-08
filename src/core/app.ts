import { NestFactory } from '@nestjs/core';
import { WinstonProvider } from '@/extends/logger';
import { SwaggerProvider } from '@/extends/swagger';
import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';

import { CoreModule } from './module';

export const bootstrap = async () => {
  const app = await NestFactory.create(CoreModule, { cors: true });

  const config: BaseConfig = app.get(ConfigFactoryProvider.provide);

  const logger = app.get(WinstonProvider);

  if (config.get('enableSwagger')) app.get(SwaggerProvider).init(app);

  app.useLogger(logger);

  await app.listen(config.get('port'));

  logger.info(`SERVER START: http://localhost:${config.get('port')}`);
  logger.info(`ENAVLE SWAGGER: http://localhost:${config.get('port')}/doc`);
};

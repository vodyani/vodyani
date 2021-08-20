import { NestFactory } from '@nestjs/core';
import { CoreModule } from '@/modules/core';
import { Config, ConfigFactoryProvider } from '@/extends/config';
import { SwaggerProvider } from '@/extends/swagger';
import { WinstonLoggerProvider } from '@/extends/logger';

export const bootstrap = async () => {
  const app = await NestFactory.create(CoreModule, { cors: true });
  const config: Config = app.get(ConfigFactoryProvider.provide);
  const logger = app.get(WinstonLoggerProvider);

  if (config.get('enableSwagger')) app.get(SwaggerProvider).build(app);

  app.useLogger(logger);

  await app.listen(config.get('port'));
  logger.info(`SERVER START: http://localhost:${config.get('port')}`);
  logger.info(`ENAVLE SWAGGER: http://localhost:${config.get('port')}/doc`);
};

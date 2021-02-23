import * as helmet from 'helmet';
import { CoreModule } from '@modules';
import { getConfigs } from '@configs';
import { StoreKeys } from '@common';
import { NestFactory } from '@nestjs/core';
import { getDatabase, getLogger, getRedis } from '@lib';
import { Pipe, Filter, Interceptor, Swagger, StoreModule, StoreProvider } from '@sophons/nest-tools';

/**
 * In the startup function, the Server and Swagger document are initialized after declaring the Global Lib Store.
 */
export const createServer = async () => {
  /**
   * Initialize server application and server store.
   */
  const app = await NestFactory.create(CoreModule, { cors: true });
  const libStore: StoreProvider<StoreKeys> = app.select(StoreModule).get(StoreProvider, { strict: true });

  /**
   * Initialize the store instance.
   */
  const configs = await getConfigs();
  const logger = await getLogger();

  libStore.save('logger', await getLogger());
  libStore.save('configs', await getConfigs());
  libStore.save('redis', await getRedis(configs.redis));
  libStore.save('database', await getDatabase(configs.database));

  /**
   * Initialize the server application middleware and aop handler.
   */
  app.use(helmet());
  app.useGlobalInterceptors(new Interceptor.RequestId(logger));
  app.useGlobalPipes(new Pipe.ValidateDto());
  app.useGlobalFilters(new Filter.RequestError(logger));
  app.useGlobalInterceptors(new Interceptor.RequestLog(logger));
  app.useGlobalInterceptors(new Interceptor.RequestFormat());

  /**
   * Create swagger document.
   */
  Swagger.create(app);

  /**
   * Start the server application.
   */
  await app.listen(configs.port);

  logger.info(`[${configs.appname}]: SERVER START WITH ${configs.env} - ${configs.port}`);
};

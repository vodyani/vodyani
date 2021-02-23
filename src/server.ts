import * as helmet from 'helmet';

import { CoreModule } from '@modules';
import { getConfigs } from '@configs';
import { NestFactory } from '@nestjs/core';
import { Filter, Interceptor, Pipe } from '@sophons/nest-tools';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { libStore, getDatabase, getLogger, getRedis } from '@lib';

/**
 * In the startup function, the Server and Swagger document are initialized after declaring the Global Lib Store
 */
export const createServer = async () => {
  /**
   * Initialize the global variable
   */
  const logger = getLogger();
  const configs = getConfigs();
  libStore.set('logger', logger);
  libStore.set('configs', configs);
  libStore.set('redis', await getRedis(configs.redis));
  libStore.set('database', await getDatabase(configs.database));

  /**
   * Initialize the Server application and bind the middleware to the AOP processor
   */
  const app = await NestFactory.create(CoreModule, { cors: true });
  app.use(helmet());
  app.useGlobalInterceptors(new Interceptor.RequestId(logger));
  app.useGlobalPipes(new Pipe.ValidateDto());
  app.useGlobalFilters(new Filter.RequestError(logger));
  app.useGlobalInterceptors(new Interceptor.RequestLog(logger));
  app.useGlobalInterceptors(new Interceptor.RequestFormat());

  /**
   * Init swagger document
   */
  const doc = new DocumentBuilder().setTitle(configs.appname).build();
  const swagger = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('/doc', app, swagger); // Declare swagger document routing

  /**
   * Start the Server application, bind the port, and log info
   */
  await app.listen(configs.port);
  logger.info(`[${configs.appname}]: SERVER START WITH ${configs.env} - ${configs.port}`);
};

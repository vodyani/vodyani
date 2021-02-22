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
  const server = await NestFactory.create(CoreModule, { cors: true });
  server.use(helmet());
  server.useGlobalInterceptors(new Interceptor.RequestId(logger));
  server.useGlobalPipes(new Pipe.ValidateDto());
  server.useGlobalFilters(new Filter.RequestError(logger));
  server.useGlobalInterceptors(new Interceptor.RequestLog(logger));
  server.useGlobalInterceptors(new Interceptor.RequestFormat());

  /**
   * Init swagger document
   */
  const doc = new DocumentBuilder().setTitle(configs.appname).build();
  const swagger = SwaggerModule.createDocument(server, doc);
  SwaggerModule.setup('/doc', server, swagger); // Declare swagger document routing

  /**
   * Start the Server application, bind the port, and log info
   */
  await server.listen(configs.port);
  logger.info(`[${configs.appname}]: SERVER START WITH ${configs.env} - ${configs.port}`);
};

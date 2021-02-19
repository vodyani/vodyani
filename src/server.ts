import * as helmet from 'helmet';
import * as Entites from '@entities';
import { CoreModule } from '@modules';
import { NestFactory } from '@nestjs/core';
import { SLS } from '@acheetahk/cloudtools';
import { Configs, getConfigs } from '@configs';
import { INestApplication } from '@nestjs/common';
import { lib, getDatabase, getLogger, getRedis } from '@lib';
import { Swagger, Filter, Pipe, Interceptor } from '@acheetahk/nest-tools';

/**
 * api server
 */
export class Server {

  private configs: Configs;
  private app: INestApplication;
  private logger: SLS.SLSLogger | SLS.SimpleLogger;

  /**
   * init lib store
   */
  async initLib() {
    const entities = [Entites.User];

    const logger = getLogger();
    const configs = getConfigs();
    const redis = getRedis(configs.redis || {});
    const database = getDatabase({ options: configs.database, entities });

    lib.set('redis', redis);
    lib.set('logger', logger);
    lib.set('configs', configs);
    lib.set('database', database);

    logger.info(`[${configs.appname}] -- INIT LIB`);
  }

  /**
   * init app
   */
  async initApp() {
    this.logger = lib.get('logger');
    this.configs = lib.get('configs');
    this.app = await NestFactory.create(CoreModule, { cors: true });

    this.logger.info(`[${this.configs.appname}] -- INIT APP`);
  }

  /**
   * use middleware
   */
  async useGlobalMiddleware() {
    this.app.use(helmet());
  }

  /**
   * use aop
   */
  async useGlobalAop() {
    this.app.useGlobalInterceptors(
      new Interceptor.RequestId(this.logger),
      new Interceptor.Logger(this.logger),
      new Interceptor.Format(),
    );

    this.app.useGlobalPipes(new Pipe.Dto());
    this.app.useGlobalFilters(new Filter.CatchError(this.logger));
  }

  /**
   * use swagger
   */
  async useGlobalSwagger() {
    await Swagger.init(this.app, 'app');
  }

  /**
   * run server
   */
  async run() {
    await this.initLib();
    await this.initApp();
    await this.useGlobalMiddleware();
    await this.useGlobalAop();
    await this.useGlobalSwagger();
    await this.app.listen(this.configs.port);

    let message = `[${this.configs.appname}]`;

    message += ` -- SERVER START WITH`;
    message += ` -- ENV: ${this.configs.env}`;
    message += ` -- LISTEN PORT: ${this.configs.port}`;

    this.logger.info(message);
  }
}

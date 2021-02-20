import * as helmet from 'helmet';
import * as Entites from '@entities';
import { CoreModule } from '@modules';
import { NestFactory } from '@nestjs/core';
import { Configs, getConfigs } from '@configs';
import { INestApplication } from '@nestjs/common';
import { lib, getDatabase, getLogger, getRedis } from '@lib';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Filter, Interceptor, NestLogger, Pipe } from '@sophons/nest-tools';

export class Server {

  private configs: Configs;
  private logger: NestLogger;
  private app: INestApplication;

  /**
   * init lib store
   */
  async initLib() {
    const logger = getLogger();
    const configs = getConfigs();
    const redis = getRedis(configs.redis || {});
    const database = getDatabase({ options: configs.database, entities: [Entites.User] });

    lib.set('redis', redis);
    lib.set('logger', logger);
    lib.set('configs', configs);
    lib.set('database', database);

    logger.info(`[${configs.appname}]: INIT LIB`);
  }

  /**
   * init app
   */
  async initApp() {
    this.app = await NestFactory.create(CoreModule, { cors: true });
    this.logger = lib.get<NestLogger>('logger');
    this.configs = lib.get<Configs>('configs');

    this.logger.info(`[${this.configs.appname}]: INIT APP`);
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
    this.app.useGlobalInterceptors(new Interceptor.RequestId(this.logger));
    this.app.useGlobalPipes(new Pipe.ValidateDto());
    this.app.useGlobalFilters(new Filter.RequestError(this.logger));
    this.app.useGlobalInterceptors(new Interceptor.RequestLog(this.logger));
    this.app.useGlobalInterceptors(new Interceptor.RequestFormat());
  }

  /**
   * use swagger
   */
  async useGlobalSwagger() {
    const options = new DocumentBuilder().setTitle(this.configs.appname).build();
    const document = SwaggerModule.createDocument(this.app, options);

    /**
     * Declare document routing
     */
    SwaggerModule.setup('/doc', this.app, document);
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

    this.logger.info(`[${this.configs.appname}]: SERVER START WITH ${this.configs.env} - ${this.configs.port}`);
  }
}

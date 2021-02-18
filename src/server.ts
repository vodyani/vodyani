import * as helmet from 'helmet';
import { CoreModule } from '@modules';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { lib, Logger, SLS, Configs, GlobalConfigs } from '@lib';
import { Swagger, Filter, Pipe, Interceptor } from '@acheetahk/nest-tools';

/**
 * nest.js server
 */
export class Server {

  private app: INestApplication;
  private configs: GlobalConfigs;
  private logger: SLS.SLSLogger | SLS.SimpleLogger;

  /**
   * init lib instance
   */
  async initLib() {
    this.configs = await new Configs().get();
    this.logger = await new Logger(this.configs.env, this.configs.appname, null).get();

    lib.set('configs', this.configs);
    lib.set('logger', this.logger);
    // lib.set('redis', await new Redis(this.configs.redis).get());
    // lib.set('database', await new Database(this.configs.database, entities).get());
  }

  /**
   * init server app instance
   */
  async initApp() {
    this.app = await NestFactory.create(CoreModule, { cors: true });
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
    this.logger.info(`${this.configs.appname} Start With ${this.configs.env}: ${this.configs.port}`);
  }
}

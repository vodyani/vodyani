import { NestFactory } from '@nestjs/core';
import { BaseLogger } from '@vodyani/winston';
import { BaseSwagger } from '@vodyani/swagger';
import { INestApplication } from '@nestjs/common';
import { ArkManager, ConfigProvider } from '@vodyani/ark';

import { CoreContainer } from './app.container';

import { PaginationResultVo, ResponseBodyVo } from '@/core/vo';
import { Configuration } from '@/infrastructure/config/common';
import { LoggerManager } from '@/infrastructure/logger/manager';

export class Launcher {
  private app: INestApplication = null;

  public async start() {
    this.app = await NestFactory.create(CoreContainer, { cors: true, logger: ['error'] });
    const config = this.app.get<ConfigProvider<Configuration>>(ArkManager.token);
    const logger = this.app.get<BaseLogger>(LoggerManager.token);
    const port = config.discovery('port');

    this.deployLogger();
    this.deployCatcher();
    this.deploySwagger();

    await this.app.listen(port);

    logger.info(`LISTEN: http://localhost:${port}`);
    logger.info(`SWAGGER: http://localhost:${port}/doc`);
  }

  private deployCatcher() {
    const logger = this.app.get<BaseLogger>(LoggerManager.token);

    process.on('uncaughtException', (error) => {
      logger.error(error, 'uncaughtException');
    });

    process.on('unhandledRejection', (reason) => {
      if (reason instanceof Error) {
        logger.error(reason, 'unhandledRejection');
      } else {
        logger.warn(reason, 'unhandledRejection');
      }
    });
  }

  private deployLogger() {
    const logger = this.app.get<BaseLogger>(LoggerManager.token);

    this.app.useLogger(logger);
  }

  private deploySwagger() {
    const config = this.app.get<ConfigProvider<Configuration>>(ArkManager.token);
    const { enable } = config.discovery('swagger');

    if (enable) {
      new BaseSwagger().deploy(
        this.app,
        {
          documentRouter: 'doc',
          extraModels: [PaginationResultVo, ResponseBodyVo],
        },
      );
    }
  }
}

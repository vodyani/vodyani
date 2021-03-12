import * as helmet from 'helmet';

import { DtoPipe } from '@core/pipe';
import { CoreModule } from '@core/module';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ExceptionCatchFilter } from '@core/filter';
import { LoggerProvider, LoggerModule } from '@library/logger';
import { ConfigModule, ConfigProvider } from '@library/configs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogInterceptor, FormatInterceptor } from '@core/interceptor';

export class ServerManager {

  private app: INestApplication;

  public async create() {
    this.app = await NestFactory.create(CoreModule, { cors: true });
    const configs = this.app.select(ConfigModule).get(ConfigProvider);
    const logger = this.app.select(LoggerModule).get(LoggerProvider);
    const iocContext = this.app.select(CoreModule);

    this.app.use(helmet());
    this.app.useLogger(logger);
    this.app.useGlobalPipes(iocContext.get(DtoPipe));
    this.app.useGlobalFilters(iocContext.get(ExceptionCatchFilter));
    this.app.useGlobalInterceptors(iocContext.get(LogInterceptor), iocContext.get(FormatInterceptor));

    if (configs.info.env !== 'prod') this.buildDoc();

    await this.app.listen(configs.info.port);
    logger.info(`${configs.info.appName} START WITH PORT: ${configs.info.port} 🚀 `);
  }

  public buildDoc() {
    const document = new DocumentBuilder().setTitle('server').build();
    const documentServer = SwaggerModule.createDocument(this.app, document);
    SwaggerModule.setup('/doc', this.app, documentServer);
  }
}

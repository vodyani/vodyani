import { FixedContext } from '@vodyani/core';
import { BaseLogger } from '@vodyani/winston';
import { FactoryProvider } from '@nestjs/common';
import { ArkManager, ConfigProvider } from '@vodyani/ark';

import { logsPath } from '@/core/common';
import { Configuration } from '@/infrastructure/config/common';

export class LoggerManager {
  public static token = Symbol('LoggerManager');

  private provider: FactoryProvider;

  constructor() {
    this.provider = {
      inject: [ArkManager.token],
      useFactory: this.useFactory,
      provide: LoggerManager.token,
    };
  }

  @FixedContext
  public getFactoryProvider() {
    return this.provider;
  }

  @FixedContext
  private async useFactory(
    config: ConfigProvider<Configuration>,
  ) {
    const env = config.discovery('env');
    const name = config.discovery('name');
    const options = config.discovery('logger');

    if (options.enableRotateLog && !options.rotateFileDirPath) {
      options.rotateFileDirPath = logsPath;
      config.set('logger', options);
    }

    return new BaseLogger({ env, name, ...options });
  }
}

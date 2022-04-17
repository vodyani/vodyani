import { BaseLogger } from '@vodyani/winston';
import { ArkManager, ConfigProvider } from '@vodyani/ark';
import { FixedContext, ProviderFactory } from '@vodyani/core';

import { logsPath } from '@/core/common';
import { Configuration } from '@/infrastructure/config/common';

export class LoggerManager implements ProviderFactory {
  public static token = Symbol('LoggerManager');

  @FixedContext
  public create() {
    return {
      inject: [ArkManager.token],
      useFactory: this.useFactory,
      provide: LoggerManager.token,
    };
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

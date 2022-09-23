import { This } from '@vodyani/class-decorator';
import { LoggerFactory } from '@vodyani/winston';
import { ArkManager, ConfigProvider } from '@vodyani/ark';
import { isValidArray, toDeepMerge } from '@vodyani/utils';
import { AsyncProvider, AsyncProviderFactory, AsyncInjectable } from '@vodyani/core';

import { logsPath } from '@/core/common';
import { Configuration } from '@/infrastructures/config/common';

@AsyncInjectable
export class LoggerManager extends AsyncProvider implements AsyncProviderFactory {
  @This
  public create() {
    return {
      useFactory: this.useFactory,
      inject: [ArkManager.getToken()],
      provide: LoggerManager.getToken(),
    };
  }

  @This
  private async useFactory(
    config: ConfigProvider<Configuration>,
  ) {
    const env = config.get('env');
    const name = config.get('name');
    let options = config.get('logger');

    if (isValidArray(options.mode)) {
      if (options.mode.includes('File')) {
        options = toDeepMerge({ fileOptions: { dirname: logsPath }}, options);
      }

      if (options.mode.includes('DailyRotateFile')) {
        options = toDeepMerge({ dailyRotateFileOptions: { dirname: logsPath }}, options);
      }
    }

    return new LoggerFactory().create({ env, name, ...options });
  }
}

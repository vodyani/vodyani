import { ArkManager, ConfigProvider } from '@vodyani/ark';
import { This } from '@vodyani/class-decorator';
import { AsyncInjectable, AsyncProviderFactory } from '@vodyani/core';
import { isValidArray, toDeepMerge } from '@vodyani/utils';
import { LoggerFactory } from '@vodyani/winston';

import { tempLogPath } from '@/core/common';
import { Configuration } from '@/infrastructures/config/common';

@AsyncInjectable
export class LoggerManager extends AsyncProviderFactory {
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
    const env = config.search('env');
    const name = config.search('name');
    let options = config.search('logger');

    if (isValidArray(options.mode)) {
      if (options.mode.includes('File')) {
        options = toDeepMerge({ fileOptions: { dirname: tempLogPath }}, options);
      }

      if (options.mode.includes('DailyRotateFile')) {
        options = toDeepMerge({ dailyRotateFileOptions: { dirname: tempLogPath }}, options);
      }
    }

    return new LoggerFactory().create({ env, name, ...options });
  }
}

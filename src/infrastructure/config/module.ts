import { ArkModule } from '@vodyani/ark';
import { DynamicModule } from '@nestjs/common';
import { convertNumber } from '@vodyani/transformer';

import { ENV, PROCESS_ENV } from './common';

import { configPath as path } from '@/core/common';

export class ConfigModule {
  static forRoot(): DynamicModule {
    const env = {
      default: ENV.DEFAULT,
      current: (process.env[PROCESS_ENV.ENV] || ENV.LOCAL) as ENV,
    };

    const params = {
      name: process.env[PROCESS_ENV.NAME] || 'SERVER',
      port: convertNumber(process.env[PROCESS_ENV.PORT], 3000),
    };

    return {
      global: true,
      module: ConfigModule,
      imports: [
        ArkModule.forRoot({
          local: { env, path, params },
        }),
      ],
    };
  }
}

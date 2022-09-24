import { DynamicModule } from '@nestjs/common';
import { ArkModule } from '@vodyani/ark';
import { toNumber, toString } from '@vodyani/utils';

import { ENV, PROCESS_ENV } from './common';

import { configPath } from '@/core/common';

export class ConfigModule {
  static forRoot(): DynamicModule {
    const options = {
      local: {
        env: {
          default: ENV.DEFAULT,
          current: toString(process.env[PROCESS_ENV.ENV], ENV.LOCAL),
        },
        params: {
          port: toNumber(process.env[PROCESS_ENV.PORT], 3000),
          name: toString(process.env[PROCESS_ENV.NAME], 'VODYANI_SERVER'),
        },
        path: configPath,
      },
    };

    return {
      imports: [
        ArkModule.forRoot(options),
      ],
      global: true,
      module: ConfigModule,
    };
  }
}

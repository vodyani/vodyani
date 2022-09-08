import { ArkModule } from '@vodyani/ark';
import { DynamicModule } from '@vodyani/core';
import { toNumber, toString } from '@vodyani/utils';

import { ENV, PROCESS_ENV } from './common';

import { resourcePath } from '@/core/common';

export class ConfigInfrastructure {
  static forRoot(): DynamicModule {
    const port = toNumber(process.env[PROCESS_ENV.PORT], 3000);
    const current = toString(process.env[PROCESS_ENV.ENV], ENV.LOCAL);
    const name = toString(process.env[PROCESS_ENV.NAME], 'VODYANI_SERVER');

    return {
      global: true,
      module: ConfigInfrastructure,
      imports: [
        ArkModule.forRoot({
          local: {
            params: { port, name },
            path: `${resourcePath}/config`,
            env: { default: ENV.DEFAULT, current },
          },
        }),
      ],
    };
  }
}

import { ArkModule } from '@vodyani/ark';
import { DynamicModule } from '@vodyani/core';

import { ENV, environment } from './common';

import { resourcePath } from '@/core/common';

export class ConfigInfrastructure {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: ConfigInfrastructure,
      imports: [
        ArkModule.forRoot({
          local: {
            path: `${resourcePath}/config`,
            env: { default: ENV.DEFAULT, current: environment.env },
            params: { port: environment.port, name: environment.name },
          },
        }),
      ],
    };
  }
}

import { DynamicModule } from '@nestjs/common';
import { ArkModule, JSONConfigLoader, LocalConfigClient } from '@vodyani/ark';
import { toNumber, toString } from '@vodyani/utils';

import { ENV, PROCESS_ENV } from './common';

import { configPath } from '@/core/common';

export class ConfigModule {
  static forRoot(): DynamicModule {
    const name = toString(process.env[PROCESS_ENV.NAME], 'VODYANI_SERVER');
    const env = toString(process.env[PROCESS_ENV.ENV], ENV.LOCAL) as ENV;
    const port = toNumber(process.env[PROCESS_ENV.PORT], 3000);

    return {
      global: true,
      module: ConfigModule,
      imports: [ArkModule.forRoot({
        args: { env, name, port },
        clients: [{
          client: new LocalConfigClient(),
          loader: new JSONConfigLoader(configPath, ENV.DEFAULT, env),
        }],
      })],
    };
  }
}

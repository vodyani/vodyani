import { SequlizeOptions, IoRedisOptions } from './interface.options';

import { ENV } from './type.configs';

export interface Configs {
  name?: string;
  env?: ENV;
  port?: string| number;
  appname?: string;
  database?: SequlizeOptions;
  redis?: IoRedisOptions;
}

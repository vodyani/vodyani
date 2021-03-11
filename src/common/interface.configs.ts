import { ENV } from './type';
import { SequlizeOptions, IoRedisOptions } from './interface.options';

export interface Configs {
  env?: ENV;
  appName?: string;
  port?: string| number;
  redis?: IoRedisOptions;
  database?: SequlizeOptions;
}

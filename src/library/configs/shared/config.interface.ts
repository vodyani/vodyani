import { ENV } from '@common/type';

export interface Configs {
  env?: ENV;
  appName?: string;
  port?: string| number;
  enableFileLoging?: boolean;
  enableConsoleLoging?: boolean;
  redis?: IoRedisOptions;
  database?: SequlizeOptions;
}

export interface SequlizeOptions {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  logging?: boolean;
  dialect?: 'postgres' | 'mysql';
  pool?: { max: number };
}

export interface IoRedisOptions {
  host?: string;
  port?: number;
  password?: string;
  expiredTime?: number;
}

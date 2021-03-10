import { ENV } from './type.configs';

export interface LoggerOptions {
  env: ENV;
  appName?: string;
  levels?: string[];
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

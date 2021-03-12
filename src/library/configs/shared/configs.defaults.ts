import { Configs } from './config.interface';

export const defaults: Configs = {
  redis: {
    host: 'localhost',
    port: 6379,
    expiredTime: 1500,
  },
  database: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
    dialect: 'postgres',
    pool: { max: 200 },
  },
};

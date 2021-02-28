import { Configs } from './interface';

export const common: Configs = {
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
    pool: { max: 50 },
  },
};

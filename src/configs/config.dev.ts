import { Configs } from './interface';

export const dev: Configs = {
  name: 'dev',
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

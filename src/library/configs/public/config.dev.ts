import { Configs } from '@common';

export const dev: Configs = {
  database: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
    dialect: 'postgres',
    pool: { max: 5 },
  },
};

import { Configs } from './config.interface';

export const dev: Configs = {
  enableFileLoging: false,
  enableConsoleLoging: true,
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

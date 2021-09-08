import { IConfig } from '../common';

export const defaultConfig: IConfig = {
  enableSwagger: false,
  enableSequelizeSync: false,
  secret: {
    jwt: 'JWT',
    sha256: 'SHA256',
  },
  sequlize: {
    username: 'root',
    password: '123456',
    database: 'book',
    host: 'localhost',
    port: 3306,
    logging: false,
    dialect: 'mysql',
    pool: { max: 5 },
    timezone: '+08:00',
  },
  server: {
    local: 'http://localhost:8080',
  },
  redis: {},
  redisCluster: {},
};

import { ENV } from '@/common';
import { IConfig } from './interface';

export const configMap: Map<string, IConfig> = new Map([
  [
    ENV.DEFAULT,
    {
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
    },
  ],
  [
    ENV.DEV,
    {
      enableSequelizeSync: true,
      enableSwagger: true,
    },
  ],
  [
    ENV.TEST,
    {
    },
  ],
  [
    ENV.PRE,
    {
    },
  ],
  [
    ENV.PROD,
    {
    },
  ],
]);

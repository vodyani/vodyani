export const test = {
  redis: {
    host: 'localhost',
    port: 6379,
    expiredTime: 1500,
  },
  database: {
    username: 'root',
    password: 'root',
    database: 'nest-server',
    host: 'localhost',
    port: 3006,
    logging: false,
    dialect: 'postgres',
    pool: { max: 50 },
  },
};

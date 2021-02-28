import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { Order } from '@entities';

export const getDatabase = async (options: SequelizeOptions) => {
  const db = new Sequelize(options);
  db.addModels([Order]);
  await db.sync(); // It is not recommended to enable it in production
  return db;
};

import { Sequelize, SequelizeOptions, ModelCtor, Model } from 'sequelize-typescript';

/**
 * Init database
 */
interface DatabaseParams {
  options?: SequelizeOptions,
  entities?: ModelCtor<Model<any, any>>[],
}

/**
 * database instance
 */
export const getDatabase = (params: DatabaseParams) => {
  if (
    !params ||
    !params.options ||
    !params.options
  ) return null;

  const db = new Sequelize(params.options);
  db.addModels(params.entities);
  db.sync(); // It is not recommended to enable it in production
  return db;
};

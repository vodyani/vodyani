import { Sequelize, SequelizeOptions, ModelCtor, Model } from 'sequelize-typescript';

/**
 * global database instance
 */
class Database {
  /**
   * init database instance
   */
  constructor(
    private readonly options?: SequelizeOptions,
    private readonly entities?: ModelCtor<Model<any, any>>[],
  ) {}

  /**
   * get database instance
   */
  public async get(): Promise<Sequelize> {
    const db = await new Sequelize(this.options);
    await db.addModels(this.entities);
    return db;
  }
}

/**
 * export namespace
 */
export {
  Database, Sequelize, SequelizeOptions, ModelCtor, Model,
};

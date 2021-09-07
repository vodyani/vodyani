import { BelongsTo, BelongsToMany, HasOne, HasMany, ModelClassGetter } from 'sequelize-typescript';

/**
 * 在关联主表中设定 建立一对一关联 (逻辑关联，无外键)
 * @param getter `() => Model` 目标表实体
 * @param foreignKey string 当前表中用于关联的字段
 * @param targetKey string 目标表中用于关联的字段
 */
export const MainToOne = (getter: ModelClassGetter, foreignKey: string) => {
  return HasOne(
    getter,
    {
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    }
  );
};

/**
 * 在关联子表中设定 建立一对一关联 (逻辑关联，无外键)
 * @param getter `() => Model` 目标表实体
 * @param foreignKey string 当前表中用于关联的字段
 * @param targetKey string 目标表中用于关联的字段
 */
export const OneToMain = (getter: ModelClassGetter, foreignKey: string, targetKey = 'id') => {
  return BelongsTo(
    getter,
    {
      targetKey,
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    }
  );
};

/**
 * 在关联子表中设定 建立多对一关联 (逻辑关联，无外键)
 * @param getter `() => Model` 目标表实体
 * @param foreignKey string 当前表中用于关联的字段
 * @param targetKey string 主表中用于关联的字段，默认是 id
 */
export const ManyToOne = (getter: ModelClassGetter, foreignKey: string, targetKey = 'id') => {
  return BelongsTo(
    getter,
    {
      targetKey,
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    }
  );
};

/**
 * 在主表中设定 建立一对多关联 (逻辑关联，无外键)
 * @param getter `() => Model` 目标表实体
 * @param foreignKey string 子表中用于关联的字段
 */
export const OneToMany = (getter: ModelClassGetter, foreignKey: string) => {
  return HasMany(
    getter,
    {
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    }
  );
};

/**
 * 在主表中设定 建立多对多关联 (逻辑关联，无外键)
 * @param getter `() => Model` 目标表实体
 * @param mapping `() => Model` 映射表实体
 * @param otherKey string 映射表中用于关联的字段
 * @param targetKey string 当前表中用于关联的字段，默认是 id
 */
export const ManyToMany = (getter: ModelClassGetter, mapping: ModelClassGetter, otherKey: string, targetKey = 'id') => {
  return BelongsToMany(
    getter,
    {
      otherKey,
      targetKey,
      through: mapping,
      constraints: false,
      foreignKey: otherKey,
      foreignKeyConstraint: false,
    }
  );
};

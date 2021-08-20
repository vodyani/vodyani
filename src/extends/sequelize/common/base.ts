import {
  Table,
  Model,
  Column,
  PrimaryKey,
  BeforeSave,
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  AutoIncrement,
  BeforeBulkCreate,
  BeforeBulkUpdate,
} from 'sequelize-typescript';
import { isNil, intersection } from 'lodash';
import { IHttpResponsePage, IHttpResponsePaginated } from '@/common';

import { IHttpResponsePaginatedOption } from './interface';

export interface IBaseEntity {
  id?: number | string;
  createdTime?: Date;
  updatedTime?: Date;
}

@Table({ freezeTableName: true, timestamps: false })
export class BaseEntity<T> extends Model<T> implements IBaseEntity {
  /** base fields */
  @PrimaryKey
  @AutoIncrement
  @Column
  public declare id: number;

  @Column({ field: 'created_time' })
  public createdTime: Date;

  @Column({ field: 'updated_time' })
  public updatedTime: Date;

  /** base hooks */
  /** 创建数据前，维护创建时间和更新时间 */
  @BeforeSave
  @BeforeCreate
  @BeforeBulkCreate
  static baseCreate(entity: any) {
    entity.createdTime = new Date();
    entity.updatedTime = new Date();
  }

  /** 更新数据前，维护更新时间 */
  @BeforeUpdate
  @BeforeUpsert
  @BeforeBulkUpdate
  static baseUpdate(entity: any) {
    entity.updatedTime = new Date();
  }

  /** base methods */
  /** 分页查询 */
  public static async paginated<T extends Model>(
    this: { new (): T } & typeof Model,
    options: IHttpResponsePaginatedOption,
  )
  : Promise<IHttpResponsePaginated<T>>
  {
    const { orderBy, orderRule } = options.page;
    const index = Number(options.page.index) || 1;
    const size = Number(options.page.size) || 10;

    options.limit = size;
    options.offset = (index - 1) * size;
    options.order = [[orderBy, orderRule]];

    const result = { rows: [], page: { index, size, pageCount: 0, count: 0 }};
    const data = await this.findAndCountAll(options);

    result.rows = data.rows;
    result.page.count = data.count;
    result.page.pageCount = Math.floor((data.count - 1) / size) + 1;

    return result;
  }

  /**
   * 从 DTO 中获取数据库查询条件
   * @param dto Record<string, any> DTO 数据传输对象
   */
  public static getConditionByDTO(dto: Record<string, any>) {
    const page: IHttpResponsePage = {};
    const condition: Record<string, any> = {};

    if (isNil(dto)) return;

    /** 计算交集，确保查询的是表内字段 */
    const raws = intersection(Object.keys(this.rawAttributes), Object.keys(dto));

    /** 获取查询条件 */
    raws
      .filter(key => !isNil(dto[key]))
      .forEach(key => { condition[key] = dto[key] });

    /** 获取分页查询条件 */
    Object.keys(dto)
      .filter(key => ['page', 'size', 'orderBy', 'orderRule'].includes(key))
      .forEach(key => { page[key] = dto[key] });

    return {
      page,
      condition,
    };
  }

  /**
   * 从 DTO 中获取实体操作参数与查询条件
   * @param dto Record<string, any> DTO 数据传输对象
   */
  public static getEntityByDTO(dto: Record<string, any>) {
    const entity: Record<string, any> = {};

    if (isNil(dto)) return;

    /** 计算交集，确保查询的是表内字段 */
    const raws = intersection(Object.keys(this.rawAttributes), Object.keys(dto));

    /** 获取部分实体参数 */
    raws
      .filter(key => !isNil(dto[key]))
      .forEach(key => { entity[key] = dto[key] });

    return { entity };
  }
}

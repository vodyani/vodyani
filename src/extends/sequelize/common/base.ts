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
import { IResponsePage, IResponsePaginated } from '@/common';

import { IBaseEntity, IResponsePaginatedOption } from './interface';

@Table({ freezeTableName: true, timestamps: false })
export class BaseEntity<T> extends Model<T> implements IBaseEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  public declare id: number;

  @Column({ field: 'created_time' })
  public createdTime: Date;

  @Column({ field: 'updated_time' })
  public updatedTime: Date;

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

  /** 分页查询 */
  public static async paginated<T extends Model>(
    this: { new (): T } & typeof Model,
    options: IResponsePaginatedOption,
  )
  : Promise<IResponsePaginated<T>>
  {
    const { orderBy, orderRule } = options.page;
    const index = Number(options.page.index) || 1;
    const size = Number(options.page.size) || 10;

    options.limit = size;
    options.offset = (index - 1) * size;
    options.order = [[orderBy, orderRule]];

    const result = { rows: [], page: { index, size, count: 0, pageCount: 0 }};
    const data = await this.findAndCountAll(options);

    result.rows = data.rows;
    result.page.count = data.count;
    result.page.pageCount = Math.floor((data.count - 1) / size) + 1;

    return result;
  }

  /**
   * 从 DTO 中获取实体查询条件
   *
   * @param dto Partial<Record<keyof T, any>> DTO 数据传输对象
   */
  public static getConditionByDTO<T>(dto: Partial<Record<keyof T, any>>) {
    const page = {} as IResponsePage;
    const condition = {} as Partial<Record<keyof T, any>>;

    if (isNil(dto)) return { page, condition };

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

    return { page, condition };
  }

  /**
   * 从 DTO 中获取实体操作参数与查询条件
   *
   * @param dto Partial<Record<keyof T, any>> DTO 数据传输对象
   */
  public static getEntityByDTO<T>(dto: Partial<Record<keyof T, any>>) {
    const entity = {} as Partial<Record<keyof T, any>>;

    if (isNil(dto)) return { entity };

    /** 计算交集，确保查询的是表内字段 */
    const raws = intersection(Object.keys(this.rawAttributes), Object.keys(dto));

    /** 获取部分实体参数 */
    raws
      .filter(key => !isNil(dto[key]))
      .forEach(key => { entity[key] = dto[key] });

    return { entity };
  }
}

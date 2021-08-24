import { Column, DataType, Table } from 'sequelize-typescript';

import { BaseEntity, IBaseEntity } from '../common';

export interface IBook extends IBaseEntity {
  name?: string;
}

@Table({ tableName: 'book', comment: 'Book表' })
export class Book
  extends BaseEntity<Book>
  implements IBook
{
  @Column({ allowNull: false, comment: '名字', type: DataType.STRING(60) })
  name: string;
}

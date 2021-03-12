import { Column, DataType, Default, Table } from 'sequelize-typescript';

import { BaseModel } from './base';

@Table({ tableName: 'book', timestamps: true, freezeTableName: true })
export class Book extends BaseModel<Book> {
  @Column({
    comment: 'book title',
    type: DataType.STRING(60),
  })
  title: string;

  @Column({
    comment: 'book author',
    type: DataType.STRING(60),
  })
  auther: string;

  @Default('')
  @Column({
    comment: 'book details',
    type: DataType.TEXT,
  })
  details: string;
}

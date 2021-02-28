import { CHAR } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import { BaseModel } from './base';

@Table({ tableName: 'Order', timestamps: true, freezeTableName: true })
export class Order extends BaseModel<Order> {
  @Column({
    type: CHAR,
    defaultValue: 'default',
    comment: 'order source',
  })
  source: string;

  @Column({
    type: CHAR,
    defaultValue: '0',
    comment: 'order code',
  })
  code: string;
}

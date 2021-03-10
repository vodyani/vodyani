import { Column, DataType, Default, Table } from 'sequelize-typescript';

import { BaseModel } from './base';

@Table({ tableName: 'Order', timestamps: true, freezeTableName: true })
export class Order extends BaseModel<Order> {

  @Default('default')
  @Column({
    comment: 'order source',
    type: DataType.STRING(60),
  })
  source: string;

  @Default('0')
  @Column({
    comment: 'order code',
    type: DataType.STRING(60),
  })
  code: string;
}

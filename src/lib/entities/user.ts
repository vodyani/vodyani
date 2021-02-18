import { Column, Table } from 'sequelize-typescript';

import { BaseModel } from './base';

@Table({ tableName: 'User', timestamps: true, freezeTableName: true })
export class User extends BaseModel<User> {
  @Column({ comment: 'user name' })
  name: string;

  @Column({ comment: 'user phone' })
  phone: string;

  @Column({ comment: 'user email' })
  email: string;
}

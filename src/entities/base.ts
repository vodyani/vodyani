import { Model, PrimaryKey, AutoIncrement, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript';

export class BaseModel<T> extends Model<T> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}

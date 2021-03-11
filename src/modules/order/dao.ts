import { Order } from '@entity';
import { Sequelize } from 'sequelize-typescript';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresqlService } from '@library/postgresql';

import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderDao {
  constructor(
    @Inject(PostgresqlService.local) private readonly postgresql: Sequelize,
  ) {}

  async findOne(id: number) {
    const result = await Order.findOne({ where: { id }});
    return result;
  }

  async create(dto: CreateOrderDto) {
    const result = await Order.create(dto);
    return result;
  }

  async update(dto: UpdateOrderDto) {
    this.postgresql.transaction(async (transaction) => {
      const { id, source } = dto;
      await Order.update({ source }, { where: { id }, transaction });
    });
  }
}

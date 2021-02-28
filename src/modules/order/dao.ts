import { Order } from '@entities';
import { StoreKeys } from '@common';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { StoreProvider } from '@sophons/nest-tools';

import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderDao {
  constructor(
    private readonly store: StoreProvider<StoreKeys>,
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
    this.store
      .get<Sequelize>('database')
      .transaction(async (transaction) => {
        const { id, source } = dto;
        await Order.update({ source }, { where: { id }, transaction });
      });
  }
}

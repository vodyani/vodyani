import { User } from '@entities';
import { StoreKeys } from '@common';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { StoreProvider } from '@sophons/nest-tools';

import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserDao {

  constructor(
    private readonly store: StoreProvider<StoreKeys>,
  ) {}

  async findOne(id: number) {
    const result = await User.findOne({ where: { id }});
    return result;
  }

  async create(dto: CreateUserDto) {
    const result = await User.create(dto);
    return result;
  }

  async update(dto: UpdateUserDto) {
    this
      .store
      .get<Sequelize>('database')
      .transaction(async (transaction) => {
        const { id, name, email, phone } = dto;
        await User.update({ name, email, phone }, { where: { id }, transaction });
      });
  }
}

import { libStore } from '@lib';
import { User } from '@entities';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserDao {

  /**
   * Self-managing dependencies
   */
  private readonly db = libStore.get<Sequelize>('database');

  async findOne(id: number) {
    const result = await User.findOne({ where: { id }});
    return result;
  }

  async create(dto: CreateUserDto) {
    const result = await User.create(dto);
    return result;
  }

  async update(dto: UpdateUserDto) {
    // Transaction execution
    this.db.transaction(async (transaction) => {
      const { id, name, email, phone } = dto;
      await User.update({ name, email, phone }, { where: { id }, transaction });
    });
  }
}

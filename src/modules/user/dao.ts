import { User } from '@entities';
import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserDao {

  async findOne(id: number) {
    const result = await User.findOne({ where: { id }});
    return result;
  }

  async create(dto: CreateUserDto) {
    const result = await User.create(dto);
    return result;
  }

  async update(dto: UpdateUserDto) {
    const { id, name, email, phone } = dto;
    await User.update({ name, email, phone }, { where: { id }});
  }
}

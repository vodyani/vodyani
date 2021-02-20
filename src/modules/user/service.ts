import { Injectable } from '@nestjs/common';

import { UserDao } from './dao';
import { FindUserDto, CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {

  constructor(private readonly dao: UserDao) {}

  async findOne(dto: FindUserDto) {
    const result = await this.dao.findOne(Number(dto.id));
    return result;
  }

  async create(dto: CreateUserDto) {
    const result = await this.dao.create(dto);
    return result;
  }

  async update(dto: UpdateUserDto) {
    await this.dao.update(dto);
  }
}

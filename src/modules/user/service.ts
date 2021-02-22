import { Redis } from 'ioredis';
import { libStore } from '@lib';
import { Configs } from '@configs';
import { Injectable } from '@nestjs/common';

import { UserDao } from './dao';
import { FindUserDto, CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {

  /**
   * Self-managing dependencies
   */
  private readonly configs = libStore.get<Configs>('configs');

  /**
   * Use Ioc containers to manage dependencies
   */
  constructor(private readonly dao: UserDao) {}

  async getAppname() {
    const redis = libStore.get<Redis>('redis');
    const record = await redis.get('appname');
    if (!record) {
      await redis.set('appname', this.configs.appname);
      return this.configs.appname;
    }
    return record;
  }

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

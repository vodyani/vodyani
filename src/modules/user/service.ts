import { Redis } from 'ioredis';
import { Configs } from '@configs';
import { StoreKeys } from '@common';
import { Injectable } from '@nestjs/common';
import { StoreProvider } from '@sophons/nest-tools';

import { UserDao } from './dao';
import { FindUserDto, CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly dao: UserDao,
    private readonly store: StoreProvider<StoreKeys>,
  ) {}

  async getAppname() {
    const redis = this.store.get<Redis>('redis');
    const configs = this.store.get<Configs>('configs');

    const record = await redis.get('appname');
    if (!await redis.get('appname')) {
      await redis.set('appname', configs.appname);
      return configs.appname;
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

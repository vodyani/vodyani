import { StoreKeys } from '@common';
import { Injectable } from '@nestjs/common';
import { SuperRedis } from '@sophons/redis';
import { StoreProvider } from '@sophons/nest-tools';

import { OrderDao } from './dao';
import { FindOrderDto, CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly dao: OrderDao,
    private readonly store: StoreProvider<StoreKeys>,
  ) {}

  async findOne(dto: FindOrderDto) {
    const result = await this.dao.findOne(Number(dto.id));
    return result;
  }

  async create(dto: CreateOrderDto) {
    const result = await this.store
      .get<SuperRedis>('redis')
      .lock(this.dao.create, { ttl: 1, key: dto.code, message: 'create fail' })
      .with(dto);

    return result;
  }

  async update(dto: UpdateOrderDto) {
    await this.dao.update(dto);
  }
}

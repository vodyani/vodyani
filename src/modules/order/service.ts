import { SuperRedis } from '@sophons/redis';
import { RedisProvider } from '@library/redis';
import { LoggerProvider } from '@library/logger';
import { Inject, Injectable } from '@nestjs/common';

import { OrderDao } from './dao';
import { FindOrderDto, CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {

  constructor(
    private readonly dao: OrderDao,
    private readonly logger: LoggerProvider,
    @Inject(RedisProvider.local) private readonly client: SuperRedis,
  ) {}

  async findOne(dto: FindOrderDto) {
    const result = await this.dao.findOne(Number(dto.id));

    this.logger.debug('[order createdAt]: ' + result.createdAt);
    return result;
  }

  async create(dto: CreateOrderDto) {
    const result = await this
      .client
      .lock(this.dao.create, { ttl: 1, key: dto.code, message: 'CREATE-FAIL' })
      .with(dto);

    return result;
  }

  async update(dto: UpdateOrderDto) {
    await this.dao.update(dto);
  }
}

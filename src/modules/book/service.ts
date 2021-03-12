import { SuperRedis } from '@sophons/redis';
import { RedisProvider } from '@library/redis';
import { ConfigProvider } from '@library/configs';
import { Inject, Injectable } from '@nestjs/common';
import { RequestPagination } from '@common/interface';

import { BookDao } from './dao';
import { FindBookDto, FindBookPaginationDto, CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {

  constructor(
    @Inject(RedisProvider.local)
    private readonly redis: SuperRedis,
    private readonly dao: BookDao,
    private readonly configs: ConfigProvider,
  ) {}

  private bookCacheKey(...args: any[]) {
    return `${this.configs.info.appName}:BOOKLIST:${JSON.stringify(args)}`;
  }

  public async create(dto: CreateBookDto) {
    const result = await this.dao.create(dto);
    return result;
  }

  public async edit(dto: UpdateBookDto) {
    await this.dao.update(dto);
  }

  public async find(dto: FindBookDto) {
    const result = await this.dao.findOne(dto);
    return result;
  }

  public async findPagination(dto: FindBookPaginationDto, pagination: RequestPagination) {
    const key = this.bookCacheKey(dto, pagination);

    const result = await this.redis
      .cache(this.dao.findPagination, { key, ttl: 600 })
      .with(dto, pagination);

    return result;
  }
}

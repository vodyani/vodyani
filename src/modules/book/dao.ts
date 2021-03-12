import { Pagination } from '@common/interface';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresqlProvider, Sequelize, Op, Book, FindOptions, FindPaginationOptions, PaginationResult } from '@library/postgresql';

import { FindBookDto, CreateBookDto, UpdateBookDto, FindBookPaginationDto } from './dto';

@Injectable()
export class BookDao {

  constructor(
    @Inject(PostgresqlProvider.local)
    private readonly postgresql: Sequelize,
  ) {}

  public async create(dto: CreateBookDto) {
    const { id, title, auther, details } = await Book.create(dto);
    return { id, title, auther, details } as Book;
  }

  public async update(dto: UpdateBookDto) {
    const result = await new Promise((resolve, reject) => {
      this.postgresql
        .transaction(async (transaction) => {
          const { id, title, auther, details } = dto;

          const entity = {};
          if (title) entity['title'] = title;
          if (auther) entity['auther'] = auther;
          if (details) entity['details'] = details;
          const result = await Book.update(entity, { where: { id }, transaction });

          if (result) resolve(result);
        })
        .catch((error) => {
          if (error) reject(error);
        });
    });

    return result;
  }

  public async findOne(dto: FindBookDto) {
    const options: FindOptions = { where: {}};

    if (dto) {
      const { id, title, auther } = dto;

      if (id) options.where['id'] = id;
      if (auther) options.where['auther'] = auther;
      if (title) options.where['title'] = { [Op.like]: `%${dto.title}%` };
    }

    const result = await Book.findOne(options);
    return result;
  }

  public async findPagination(
    dto: FindBookPaginationDto,
    pagination: Pagination,
  )
    :Promise<PaginationResult<Book>>
  {
    const options: FindPaginationOptions = {
      where: {},
      pagination,
    };

    if (dto) {
      const { id, title, auther } = dto;
      if (id) options.where['id'] = id;
      if (title) options.where['title'] = title;
      if (auther) options.where['auther'] = auther;
    }

    const result = await Book.findPagination<Book>(options);
    return result;
  }
}

import { ApiTags } from '@nestjs/swagger';
import { CurrentPage } from '@core/decorator';
import { Pagination } from '@common/interface';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';

import { BookService } from './service';
import { FindBookDto, FindBookPaginationDto, CreateBookDto, UpdateBookDto } from './dto';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateBookDto) {
    const result = await this.service.create(dto);
    return result;
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body() dto: UpdateBookDto) {
    const result = await this.service.edit(dto);
    return result;
  }

  @Get('find')
  @HttpCode(HttpStatus.OK)
  async find(@Query() dto: FindBookDto) {
    const result = await this.service.find(dto);
    return result;
  }

  @Get('findPagination')
  @HttpCode(HttpStatus.OK)
  async findPagination(
    @Query() dto: FindBookPaginationDto,
    @CurrentPage() pagination: Pagination,
  ) {
    const result = await this.service.findPagination(dto, pagination);
    return result;
  }
}

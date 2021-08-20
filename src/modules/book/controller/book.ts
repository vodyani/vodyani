/**
 * 业务逻辑控制层（Controller）
 */

import { HTTP_STATUS, IHttpResponsePaginated } from '@/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, HttpException, Param, Post, Query } from '@nestjs/common';
import { ApiPaginatedResponseBO, ApiListResponseBO, ApiResponseBO } from '@/extends/swagger';

import { CreateBookDTO, FindBookDTO, PaginatedBookDTO, UpdateBookDTO } from '../dto';
import { BookService } from '../service';
import { BookBO } from '../bo';

@ApiTags('Book')
@Controller('')
@ApiExtraModels(BookBO)
export class BookController {
  constructor(
    private readonly Book: BookService,
  ) {}

  @ApiOperation({ summary: '查询详情 - Book' })
  @ApiResponseBO(BookBO)
  @Get('/find/one')
  public async findOne(@Query() dto: FindBookDTO): Promise<BookBO> {
    return this.Book.findOne(dto);
  }

  @ApiOperation({ summary: '查询全部 - Book' })
  @ApiListResponseBO(BookBO)
  @Get('/find/all')
  public async findAll(@Query() dto: FindBookDTO): Promise<BookBO[]> {
    return this.Book.findAll(dto);
  }

  @ApiOperation({ summary: '分页查询 - Book' })
  @ApiPaginatedResponseBO(BookBO)
  @Get('/paginated')
  public async paginated(@Query() dto: PaginatedBookDTO): Promise<IHttpResponsePaginated<BookBO>> {
    return this.Book.paginated(dto);
  }

  @ApiOperation({ summary: '创建 - Book' })
  @ApiResponseBO(BookBO)
  @Post('/create')
  @HttpCode(HTTP_STATUS.SUCCESS)
  public async create(@Body() dto: CreateBookDTO): Promise<BookBO> {
    return this.Book.create(dto);
  }

  @ApiOperation({ summary: '更新 - Book' })
  @ApiResponseBO()
  @Post('/update/:id')
  @HttpCode(HTTP_STATUS.SUCCESS)
  public async update(@Param('id') id: string, @Body() dto: UpdateBookDTO): Promise<void> {
    if (!id) throw new HttpException('请求参数有误，缺少 id', HTTP_STATUS.PARAM_UNPROCESSABLE);
    return this.Book.update(id, dto);
  }

  @ApiOperation({ summary: '删除 - Book' })
  @ApiResponseBO()
  @Post('/delete/:id')
  @HttpCode(HTTP_STATUS.SUCCESS)
  public async delete(@Param('id') id: string): Promise<void> {
    if (!id) throw new HttpException('请求参数有误，缺少 id', HTTP_STATUS.PARAM_UNPROCESSABLE);
    return this.Book.delete(id);
  }
}


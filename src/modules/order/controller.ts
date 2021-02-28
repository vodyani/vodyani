import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';

import { OrderService } from './service';
import { FindOrderDto, CreateOrderDto, UpdateOrderDto } from './dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get('find')
  @HttpCode(HttpStatus.OK)
  async find(@Query() dto: FindOrderDto) {
    const result = await this.service.findOne(dto);
    return result;
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateOrderDto) {
    const result = await this.service.create(dto);
    return result;
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateOrderDto) {
    await this.service.update(dto);
    return 'update success';
  }
}

import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';

import { UserService } from './service';
import { FindUserDto, CreateUserDto, UpdateUserDto } from './dto';

@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {}

  @Get('get/appname')
  @HttpCode(HttpStatus.OK)
  async getAppname() {
    const record = await this.service.getAppname();
    return record;
  }

  @Get('find')
  @HttpCode(HttpStatus.OK)
  async find(@Query() dto: FindUserDto) {
    const result = await this.service.findOne(dto);
    return result;
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateUserDto) {
    const result = await this.service.create(dto);
    return result;
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateUserDto) {
    await this.service.update(dto);
    return 'update success';
  }
}

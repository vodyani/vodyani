import * as IORedis from 'ioredis';

import { lib } from '@lib';
import { Configs } from '@configs';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';

import { UserService } from './service';
import { FindUserDto, CreateUserDto, UpdateUserDto } from './dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  /**
   * Self-managing dependencies
   */
  private readonly configs: Configs = lib.get<Configs>('configs');

  /**
   * Use IOC containers to manage dependencies
   */
  constructor(private readonly service: UserService) {}

  @Get('get/appname')
  @HttpCode(HttpStatus.OK)
  async getAppname() {
    const redis = lib.get<IORedis.Redis>('redis');

    const record = await redis.get('appname');

    if (!record) {
      await redis.set('appname', this.configs.appname);
      return this.configs.appname;
    }

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

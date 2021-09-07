/**
 * Controller (业务逻辑控制层)
 *
 * 本层的使用场景有：
 *
 * 1. 定义 Router Path
 * 2. 指定 DTO (输入)
 * 4. 指定 Logic Flow，将业务处理转发到 Service 层，并获取 BO (输出)
 */

import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ApiResponseBO } from '@/extends/swagger';

@ApiTags('默认路径')
@Controller('/')
export class DefaultController {
  @ApiResponseBO()
  @Get()
  async default() {
    return {};
  }
}

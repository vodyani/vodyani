import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { ApiResponseVo } from '@/core/decorator';

@ApiTags('default')
@Controller('/')
export class DefaultController {
  @Get()
  @ApiResponseVo()
  async default() {
    return {};
  }
}

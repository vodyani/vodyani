import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@vodyani/swagger';

import { DefaultService } from './service';

import { ApiResponseVo } from '@/core/decorator';

@ApiTags('default')
@Controller('/')
export class DefaultController {
  constructor(
    private readonly service: DefaultService,
  ) {}

  @Get()
  @ApiResponseVo()
  public index() {
    return this.service.index();
  }
}

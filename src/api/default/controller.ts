import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { ApiResponseVo } from '@/core/decorator';
import { DefaultService } from '@/domain/default/service';

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

import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { DefaultService } from '@/domain/default/service';
import { ApiResponseVo } from '@/infrastructure/swagger/decorator';

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

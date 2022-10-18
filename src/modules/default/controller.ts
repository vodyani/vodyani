import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@vodyani/swagger';

import { DefaultService } from './service';

import { ApiResponseVO } from '@/core/decorator';

@Controller('/')
@ApiTags('Default')
export class DefaultController {
  constructor(
    private readonly service: DefaultService,
  ) {}

  @Get()
  @ApiResponseVO()
  public index() {
    return this.service.index();
  }
}

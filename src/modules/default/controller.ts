import { Controller, Get } from '@nestjs/common';

import { DefaultService } from './service';

@Controller('/')
export class DefaultController {
  constructor(
    private readonly service: DefaultService,
  ) {}

  @Get()
  public index() {
    return this.service.index();
  }
}

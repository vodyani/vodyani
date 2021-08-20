import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('默认路径')
@Controller('/')
export class DefaultController {
  @Get()
  async default() {
    return 'I\'m Health';
  }
}

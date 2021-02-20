import { ApiTags } from '@nestjs/swagger';
import { All, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@ApiTags('health')
@Controller()
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async health(): Promise<string> {
    return 'I\'M Health';
  }

  @All()
  @HttpCode(HttpStatus.NOT_FOUND)
  async global(): Promise<string> {
    return 'The current path does not exist';
  }
}

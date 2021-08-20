import { Module } from '@nestjs/common';

import { SwaggerProvider } from './provider';

@Module({
  exports: [SwaggerProvider],
  providers: [SwaggerProvider],
})
export class SwaggerModule {}

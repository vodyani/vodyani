import { Module } from '@nestjs/common';

import { DtoCamelCasePipe } from './pipe';
import { ResponseFormatInterceptor, ResponseSnakeCaseInterceptor } from './interceptor';

@Module({
  providers: [
    DtoCamelCasePipe,
    ResponseFormatInterceptor,
    ResponseSnakeCaseInterceptor,
  ],
  exports: [
    DtoCamelCasePipe,
    ResponseFormatInterceptor,
    ResponseSnakeCaseInterceptor,
  ],
})
export class ConvertorModule {}

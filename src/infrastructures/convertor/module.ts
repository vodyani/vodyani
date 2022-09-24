import { Module } from '@nestjs/common';

import { DtoCamelCasePipe } from './pipe';
import { ResponseFormatInterceptor, ResponseSnakeCaseInterceptor } from './interceptor';

const providers = [
  DtoCamelCasePipe,
  ResponseFormatInterceptor,
  ResponseSnakeCaseInterceptor,
];

@Module({
  providers,
  exports: providers,
})
export class ConvertorModule {}

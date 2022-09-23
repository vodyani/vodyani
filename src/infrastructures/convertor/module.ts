import { Module } from '@vodyani/core';

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

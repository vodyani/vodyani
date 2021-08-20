import { Module } from '@nestjs/common';

import { HttpClientProvider } from './provider';

@Module({
  exports: [HttpClientProvider],
  providers: [HttpClientProvider],
})
export class HttpClientModule {}

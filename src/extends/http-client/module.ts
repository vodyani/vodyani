import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { HttpClientProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [HttpClientProvider],
  providers: [HttpClientProvider],
})
export class HttpClientModule {}

import { Module } from '@nestjs/common';

import { UtilsModule } from '../utils';
import { ConfigModule } from '../config';
import { HttpClientProvider } from './provider';

@Module({
  imports: [
    UtilsModule,
    ConfigModule,
  ],
  exports: [
    HttpClientProvider,
  ],
  providers: [
    HttpClientProvider,
  ],
})
export class HttpClientModule {}

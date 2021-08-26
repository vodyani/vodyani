import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { LocalClientProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [LocalClientProvider],
  providers: [LocalClientProvider],
})
export class HttpClientModule {}

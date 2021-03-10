import { Module } from '@nestjs/common';
import { ConfigModule } from '@lib/configs';

import { PostgresqlService } from './service';

@Module({
  imports: [ConfigModule],
  exports: [...PostgresqlService.getProviders()],
  providers: [...PostgresqlService.getProviders()],
})
export class PostgresqlModule {}

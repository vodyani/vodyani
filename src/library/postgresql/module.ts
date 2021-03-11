import { Module } from '@nestjs/common';
import { ConfigModule } from '@library/configs';

import { PostgresqlProvider } from './provider';

@Module({
  imports: [ConfigModule],
  exports: [...PostgresqlProvider.getProviders()],
  providers: [...PostgresqlProvider.getProviders()],
})
export class PostgresqlModule {}

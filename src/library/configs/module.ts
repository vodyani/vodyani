import { Module } from '@nestjs/common';

import { ConfigProvider } from './provider';

@Module({
  exports: [ConfigProvider],
  providers: [ConfigProvider],
})
export class ConfigModule {}

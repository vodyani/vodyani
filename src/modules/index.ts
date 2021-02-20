import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { UserModule } from './user';

@Module({
  imports: [
    UserModule,
    HealthModule,
  ],
})

export class CoreModule {}

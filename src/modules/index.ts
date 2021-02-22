import { Module } from '@nestjs/common';

import { UserModule } from './user';
import { HealthModule } from './health';

@Module({
  imports: [
    UserModule,
    HealthModule, // HealthModule Must be declared at the end
  ],
})

export class CoreModule {}

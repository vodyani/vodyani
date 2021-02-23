import { Module } from '@nestjs/common';
import { HealthModule, StoreModule } from '@sophons/nest-tools';

import { UserModule } from './user';

@Module({
  imports: [
    /**
     * The common modules
     */
    StoreModule,
    HealthModule,

    /**
     * The business logic modules
     */
    UserModule,
  ],
})

export class CoreModule {}

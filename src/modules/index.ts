import { Module } from '@nestjs/common';
import { HealthModule, StoreModule } from '@sophons/nest-tools';

import { OrderModule } from './order';

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
    OrderModule,
  ],
})

export class CoreModule {}

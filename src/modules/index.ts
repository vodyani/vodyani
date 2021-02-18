import { Module } from '@nestjs/common';
import { HealthModule } from '@acheetahk/nest-tools';

@Module({
  imports: [
    HealthModule,
  ],
})

export class CoreModule {}

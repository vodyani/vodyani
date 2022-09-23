import { Module } from '@vodyani/core';

import { DefaultController } from './controller';
import { DefaultService } from './service';

@Module({
  controllers: [DefaultController],
  providers: [DefaultService],
})
export class DefaultModule {}

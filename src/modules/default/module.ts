import { Module } from '@nestjs/common';

import { DefaultController } from './controller';
import { DefaultService } from './service';

@Module({
  controllers: [DefaultController],
  providers: [DefaultService],
})
export class DefaultModule {}

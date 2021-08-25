import { Module } from '@nestjs/common';

import { DefaultController } from './controller';

@Module({
  controllers: [DefaultController],
})
export class DefaultModule {}

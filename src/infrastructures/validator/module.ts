import { Module } from '@nestjs/common';

import { DtoValidatePipe } from './pipe';

const providers = [
  DtoValidatePipe,
];

@Module({
  providers,
  exports: providers,
})
export class ValidatorModule {}

import { Module } from '@vodyani/core';

import { DtoValidatePipe } from './pipe';

const providers = [
  DtoValidatePipe,
];

@Module({
  providers,
  exports: providers,
})
export class ValidatorModule {}

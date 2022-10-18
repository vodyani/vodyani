import { Module } from '@nestjs/common';

import { DtoValidatePipe } from './pipe';

@Module({
  providers: [
    DtoValidatePipe,
  ],
  exports: [
    DtoValidatePipe,
  ],
})
export class ValidatorModule {}

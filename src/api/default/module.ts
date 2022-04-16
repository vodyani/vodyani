import { ApiRegister } from '@vodyani/core';

import { DefaultController } from './controller';

import { DefaultDomain } from '@/domain/default/module';

@ApiRegister({
  imports: [
    DefaultDomain,
  ],
  controller: [
    DefaultController,
  ],
})
export class DefaultApi {}

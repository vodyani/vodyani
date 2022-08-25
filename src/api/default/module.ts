import { Api } from '@vodyani/core';

import { DefaultController } from './controller';

import { DefaultDomain } from '@/domain/default/module';

@Api({
  import: [
    DefaultDomain,
  ],
  controller: [
    DefaultController,
  ],
})
export class DefaultApi {}

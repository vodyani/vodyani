import { ApiModule } from '@vodyani/core';

import { DefaultController } from './controller';

import { DefaultDomain } from '@/domain/default/module';

@ApiModule({
  imports: [
    DefaultDomain,
  ],
  controller: [
    DefaultController,
  ],
})
export class DefaultApi {}

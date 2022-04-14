import { ApiRegister } from '@vodyani/core';

import { DefaultController } from './controller';

@ApiRegister({
  controller: [
    DefaultController,
  ],
})
export class DefaultApi {}

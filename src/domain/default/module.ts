import { Domain } from '@vodyani/core';

import { DefaultService } from './service';

@Domain({
  service: [DefaultService],
})
export class DefaultDomain {}

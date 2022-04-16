import { DomainRegister } from '@vodyani/core';

import { DefaultService } from './service';

@DomainRegister({
  exports: [DefaultService],
  service: [DefaultService],
})
export class DefaultDomain {}

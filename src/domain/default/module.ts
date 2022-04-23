import { DomainModule } from '@vodyani/core';

import { DefaultService } from './service';

@DomainModule({
  exports: [DefaultService],
  service: [DefaultService],
})
export class DefaultDomain {}

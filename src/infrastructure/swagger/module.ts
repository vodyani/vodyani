import { Infrastructure } from '@vodyani/core';

import { SwaggerProvider } from './provider';

@Infrastructure({
  provider: [SwaggerProvider],
  export: [SwaggerProvider],
})
export class SwaggerInfrastructure {}


import { CreateOptions as LoggerOptions } from '@vodyani/winston';

import { SwaggerConfig } from './swagger';

export interface ResourceConfig {
  logger?: LoggerOptions;
  swagger?: SwaggerConfig;
}

import { CreateOptions as LoggerOptions } from '@vodyani/winston';

import { SwaggerOptions } from './swagger';

export interface ResourceConfig {
  logger?: LoggerOptions;
  swagger?: SwaggerOptions;
}

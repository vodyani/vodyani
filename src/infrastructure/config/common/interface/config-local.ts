import { BaseLoggerOptions } from '@vodyani/winston';

import { SwaggerConfig } from './config-swagger';

export interface LocalConfig {
  swagger?: SwaggerConfig;
  logger?: BaseLoggerOptions;
}

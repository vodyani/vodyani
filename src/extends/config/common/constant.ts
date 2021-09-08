import { ENV } from '@/common';

import { IConfig } from './interface';
import { defaultConfig, devConfig, testConfig, preConfig, prodConfig } from '../shared';

export const configMap: Map<string, IConfig> = new Map([
  [ENV.DEFAULT, defaultConfig],
  [ENV.DEV, devConfig],
  [ENV.TEST, testConfig],
  [ENV.PRE, preConfig],
  [ENV.PROD, prodConfig],
]);

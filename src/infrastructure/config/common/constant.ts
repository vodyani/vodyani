import { toString, toNumber } from '@vodyani/utils';

import { PROCESS_ENV, ENV } from './enum';

export const environment = {
  port: toNumber(process.env[PROCESS_ENV.PORT], 3000),
  env: toString(process.env[PROCESS_ENV.ENV], ENV.LOCAL),
  name: toString(process.env[PROCESS_ENV.NAME], 'VODYANI_SERVER'),
};

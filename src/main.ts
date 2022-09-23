import { resolve } from 'path';

import { addAliases } from 'module-alias';

addAliases({
  '@/core': resolve(__dirname, './core'),
  '@/modules': resolve(__dirname, './modules'),
  '@/infrastructures': resolve(__dirname, './infrastructures'),
});

import { bootstrap } from './bootstrap';

bootstrap();

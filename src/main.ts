import { resolve } from 'path';

import { addAliases } from 'module-alias';

addAliases({
  '@/api': resolve(__dirname, './api'),
  '@/core': resolve(__dirname, './core'),
  '@/domain': resolve(__dirname, './domain'),
  '@/infrastructure': resolve(__dirname, './infrastructure'),
});

import { bootstrap } from './bootstrap';

bootstrap();

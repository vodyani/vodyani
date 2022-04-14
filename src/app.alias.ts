import { resolve } from 'path';

import { addAliases } from 'module-alias';

/**
 * Source of the problem: After adding the `tsc` compilation, you can set the alias path by `tsconfig.json`.
 * How to solve: The characteristics are so.
 */
addAliases({
  '@/api': resolve(__dirname, './api'),
  '@/core': resolve(__dirname, './core'),
  '@/domain': resolve(__dirname, './domain'),
  '@/infrastructure': resolve(__dirname, './infrastructure'),
});

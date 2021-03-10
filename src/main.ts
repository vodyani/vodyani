/**
 * The initializer module references the alias
 */
import { resolve } from 'path';
import { addAliases } from 'module-alias';

addAliases({
  '@lib': resolve(__dirname, './lib'),
  '@common': resolve(__dirname, './common'),
  '@entity': resolve(__dirname, './entity'),
  '@modules': resolve(__dirname, './modules'),
});

/**
 * After initializer module references alias, Creating a Server Application
 */
import { createServer } from './server';

createServer();

/**
 * The initializer module references the alias
 */
import { addAliases } from 'module-alias';

addAliases({
  '@lib': `${__dirname}/lib`,
  '@common': `${__dirname}/common`,
  '@configs': `${__dirname}/configs`,
  '@modules': `${__dirname}/modules`,
  '@entities': `${__dirname}/entities`,
  '@modules/*': `${__dirname}/modules/*`,
});

/**
 * After initializer module references alias, Creating a Server Application
 */
import { createServer } from './server';

createServer();

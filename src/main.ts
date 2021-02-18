/**
 * server alias
 */
import { addAliases } from 'module-alias';

addAliases({
  '@lib': `${__dirname}/lib`,
  '@common': `${__dirname}/common`,
  '@modules': `${__dirname}/modules`,
  '@modules/*': `${__dirname}/modules/*`,
});

/**
 * create server
 */
import { Server } from './server';

new Server().run();

/**
 * server alias
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
 * create server
 */
import { Server } from './server';

new Server().run();

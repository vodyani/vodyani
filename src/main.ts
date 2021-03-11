/**
 * The initializer module references the alias
 */
import { addAliases } from 'module-alias';

import { pathConstant } from './common';

addAliases({
  '@common': pathConstant.common,
  '@entity': pathConstant.entity,
  '@library': pathConstant.library,
  '@modules': pathConstant.modules,
});

/**
 * After initializer module references alias, Creating a Server Application
 */
import { createServer } from './server';

createServer();

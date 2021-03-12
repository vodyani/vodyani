import { addAliases } from 'module-alias';

/**
 * The initializer module references the alias
 */
import { pathConstant } from './common';

addAliases({
  '@core': pathConstant.core,
  '@common': pathConstant.common,
  '@library': pathConstant.library,
  '@modules': pathConstant.modules,
});

/**
 * After initializer module references alias, Creating a Server Application
 */
import { ServerManager } from './core';

new ServerManager().create();

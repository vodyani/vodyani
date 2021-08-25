import { addAliases } from 'module-alias';

/** 别名初始化 */
import { globalPath } from './common';

addAliases({
  '@/common': globalPath.common,
  '@/extends': globalPath.extends,
  '@/modules': globalPath.modules,
});

/** 别名初始化后再继续创建服务 */
import { bootstrap } from './core';

bootstrap();

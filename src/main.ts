import { addAliases } from 'module-alias';

/** 别名初始化 */
import { path } from './common';

addAliases({
  '@/core': path.core,
  '@/common': path.common,
  '@/extends': path.extends,
  '@/modules': path.modules,
});

/** 别名初始化后再继续创建服务 */
import { bootstrap } from './core';

bootstrap();

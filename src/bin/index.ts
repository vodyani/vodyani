import { addAliases } from 'module-alias';

/** 初始化引用别名 */
import { globalPath } from '../common/constant';

addAliases({
  '@/common': globalPath.common,
  '@/extends': globalPath.extends,
  '@/modules': globalPath.modules,
});

/** 完成引用别名初始化后再继续创建服务 */
import { bootstrap } from './app';

bootstrap();

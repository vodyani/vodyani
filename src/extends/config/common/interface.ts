import { ENV } from '@/common';
import { Options } from 'sequelize';
import { RedisOptions, ClusterOptions, ClusterNode } from 'ioredis';

/** 配置 */
export interface IConfig {
  /** 环境变量 */
  env?: ENV;
  /** 进程 ID */
  pid?: number;
  /** 应用名称 */
  name?: string;
  /** 应用监听端口 */
  port?: number;
  /** 应用加密秘钥 */
  secret?: Record<string, any>;
  /** 是否启用 swagger */
  enableSwagger?: boolean;
  enableSequelizeSync?: boolean;
  sequlize?: Options;
  redis?: RedisOptions;
  redisCluster?: {
    options?: ClusterOptions;
    nodes?: ClusterNode[];
  }
  server?: {
    local: string;
  }
}

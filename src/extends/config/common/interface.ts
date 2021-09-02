import { ENV } from '@/common';
import { RedisOptions, ClusterOptions, ClusterNode } from 'ioredis';
import { SequelizeOptions } from 'sequelize-typescript';

/** 配置 */
export interface IConfig {
  env?: ENV;
  pid?: number;
  name?: string;
  port?: number;
  secret?: Record<string, any>;
  enableSwagger?: boolean;
  enableSequelizeSync?: boolean;
  sequlize?: SequelizeOptions;
  redis?: RedisOptions;
  redisCluster?: {
    options?: ClusterOptions;
    nodes?: ClusterNode[];
  }
  server?: {
    local: string;
  }
}

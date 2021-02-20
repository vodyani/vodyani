import { NestLogger } from '@sophons/nest-tools';

/**
 * logger instance
 */
export const getLogger = () => {
  return new NestLogger();
};

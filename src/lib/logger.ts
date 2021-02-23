import { NestLogger } from '@sophons/nest-tools';

export const getLogger = async () => new NestLogger();

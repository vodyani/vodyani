import { libStore } from './store';

/**
 * Only declared keys can be used
 */
type LibKeys = 'database'| 'configs' | 'logger' | 'redis';

/**
 * global libStore instance
 */
export const lib = libStore<LibKeys>();

/**
 * export lib namespace
 */
export * from './redis';
export * from './logger';
export * from './configs';
export * from './entities';
export * from './database';

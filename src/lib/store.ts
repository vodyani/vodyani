import { Store } from '@sophons/nest-tools';

/**
 * Only declared keys can be used
 */
type LibKeys = 'database'| 'configs' | 'logger' | 'redis';

/**
 * global lib instance
 */
export const lib = Store.createStore<LibKeys>();

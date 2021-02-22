import { Store } from '@sophons/nest-tools';

/**
 * Only declared variables can be used
 */
type StoreKeys = 'database'| 'configs' | 'logger' | 'redis';

/**
 * The Global Lib Store, where we manage the registration and reference of global variables
 */
export const libStore = Store.createStore<StoreKeys>();

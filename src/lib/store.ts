/**
 * global store
 */
export const libStore = <LibKeys>() => {
  /**
   * Access the instance object using the map structure
   */
  const store: Map<LibKeys, any> = new Map();

  /**
   * get store instance
   */
  const get = <T>(key: LibKeys): T => {
    return store.get(key);
  };

  /**
   * set store instance
   */
  const set = <T>(key: LibKeys, value: T): void => {
    store.set(key, value);
  };

  return { get, set };
};

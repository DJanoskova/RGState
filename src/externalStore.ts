import { useCallback, useSyncExternalStore } from 'react';

import { StoreType } from './types';

export const useStore = <T, >(store: StoreType, propertyName: string): T => {
  const getSnapshot = useCallback(() => store.getState()[propertyName], [store, propertyName]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
};

import { useCallback, useSyncExternalStore } from 'react';

import { SetStateType, StateType, StoreListenerType, StoreType } from './types';

/**
 * https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 */
export const createStore = (initialState: StateType = {}): StoreType => {
  let state = initialState;
  const getState = () => state;

  const listeners: Set<StoreListenerType> = new Set();

  const setState = (fn: SetStateType) => {
    state = fn(state);
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: StoreListenerType) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe };
};

export const useStore = <T, >(store: StoreType, propertyName: string): T => {
  const getSnapshot = useCallback(() => store.getState()[propertyName], [store, propertyName]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
};

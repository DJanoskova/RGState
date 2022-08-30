import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateStoreOptions,
  GlobalState,
  GlobalStateSetType,
  GlobalStateSetValuesType, SetStateType,
  StateType, StoreListenerType, StoreType,
} from './types';

import { useStore } from './externalStore';

let store: StoreType | undefined;

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

export function createGlobalState<T>(defaultValue: T, { name }: CreateStoreOptions = {}): GlobalState<T> {
  if (!store) store = createStore();

  if (name) {
    const existingValue = store.getState()[name];
    if (existingValue) return existingValue;
  }

  return {
    _defaultValue: defaultValue,
    _id: name || uuidv4(),
  }
}

export const useGlobalState = <T, >(state: GlobalState<T>): GlobalStateSetValuesType<T> => {
  const value = useGlobalGetter(state);
  const handleSet = useGlobalSetter(state);

  return [value, handleSet];
};

export const useGlobalGetter = <T, >(stateInstance: GlobalState<T>): T => {
  if (!store) store = createStore();

  const value = useStore<T>(store, stateInstance._id);

  return value === undefined ? stateInstance._defaultValue : value;
};

export const useGlobalSetter = <T, >(stateInstance: GlobalState<T>) => {
  const handleStateSet = useCallback((handler: GlobalStateSetType<T>) => {
    const setter = (previous: StateType) => {
      const displayedName = stateInstance._id;
      let result: T;

      if (typeof handler === 'function') {
        const previousValue = previous[displayedName] === undefined ? stateInstance._defaultValue : previous[displayedName];
        // @ts-ignore
        result = handler(previousValue);
      } else {
        result = handler;
      }

      return {
        ...previous,
        [displayedName]: result,
      };
    };

    if (!store) store = createStore();

    store.setState(setter);
  }, [stateInstance._defaultValue, stateInstance._id]);

  return handleStateSet;
};

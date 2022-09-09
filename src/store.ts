import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { deepRecreate } from 'object-deep-recreate';

import {
  CreateStoreOptions,
  GlobalState,
  GlobalStateSetType,
  GlobalStateSetValuesType, SetStateType,
  StateType, StoreListenerType, StoreType,
} from './types';

import { useStore } from './externalStore';
import { getStoredState, setStoredState } from './localStorage';

let store: StoreType | undefined;

/**
 * https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 */
export const createStore = (initialState: StateType = {}): StoreType => {
  const storedState = getStoredState();
  let state = { ...storedState, ...initialState };
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

export function createGlobalState<T>(defaultValue: T, { name, persist = false }: CreateStoreOptions = {}): GlobalState<T> {
  if (!store) store = createStore();

  return {
    _defaultValue: defaultValue,
    _id: name || uuidv4(),
    _persist: persist,
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

export const getStateValue = <T, >(state: StateType, stateInstance: GlobalState<T>) => {
  const currentValue = state[stateInstance._id];
  return currentValue === undefined ? stateInstance._defaultValue : currentValue;
}

export const useGlobalSetter = <T, >(stateInstance: GlobalState<T>) => {
  const handleStateSet = useCallback((handler: GlobalStateSetType<T>) => {
    const setter = (previous: StateType) => {
      const displayedName = stateInstance._id;
      let result: T;

      const previousValue = getStateValue<T>(previous, stateInstance);
      const snapshot = JSON.parse(JSON.stringify(previousValue));
      if (typeof handler === 'function') {
        // @ts-ignore
        result = handler(previousValue);
      } else {
        result = handler;
      }

      const recreatedResult = deepRecreate(result, snapshot);
      if (stateInstance._persist) {
        setStoredState(stateInstance._id, recreatedResult)
      }

      return {
        ...previous,
        [displayedName]: recreatedResult,
      };
    };

    if (!store) store = createStore();

    store.setState(setter);
  }, [stateInstance._defaultValue, stateInstance._id]);

  return handleStateSet;
};

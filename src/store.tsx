import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  GlobalState,
  GlobalStateSetType,
  GlobalStateSetValuesType,
  StateType,
} from './types';

import { createStore, useStore } from './externalStore';

const store = createStore();

export const createGlobalState = <T, >(defaultValue: T): GlobalState<T> => {
  return {
    _defaultValue: defaultValue,
    _id: uuidv4(),
  }
};

export const useGlobalState = <T, >(state: GlobalState<T>): GlobalStateSetValuesType<T> => {
  const value = useGlobalGetter(state);
  const handleSet = useGlobalSetter(state);

  return [value, handleSet];
};

export const useGlobalGetter = <T, >(stateInstance: GlobalState<T>): T => {
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
        result = handler(previousValue, previous);
      } else {
        result = handler;
      }

      return {
        ...previous,
        [displayedName]: result,
      };
    };

    store.setState(setter);
  }, [stateInstance._defaultValue, stateInstance._id]);

  return handleStateSet;
};

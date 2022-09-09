export type StoreListenerType = () => void;
export type StateType = Record<string, any>;
export type SetStateType = (previous: StateType) => StateType;
export type StoreType = {
  getState: () => StateType;
  setState: (fn: SetStateType) => void;
  subscribe: (listener: StoreListenerType) => () => void;
};

export type GlobalStateSetType<T> = T | ((previous: T, state: StateType) => T);
export type GlobalStateSetValuesType<T> = [T, (handler: GlobalStateSetType<T>) => void];

export interface GlobalState<T> {
  _id: string;
  _defaultValue: T;
  _persist: boolean;
}

export interface CreateStoreOptions {
  name?: string;
  persist?: boolean;
}
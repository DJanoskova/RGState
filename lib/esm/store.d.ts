import { GlobalState, GlobalStateSetType, GlobalStateSetValuesType } from './types';
export declare const createGlobalState: <T>(defaultValue: T) => GlobalState<T>;
export declare const useGlobalState: <T>(state: GlobalState<T>) => GlobalStateSetValuesType<T>;
export declare const useGlobalGetter: <T>(stateInstance: GlobalState<T>) => T;
export declare const useGlobalSetter: <T>(stateInstance: GlobalState<T>) => (handler: GlobalStateSetType<T>) => void;

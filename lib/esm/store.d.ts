import { CreateStoreOptions, GlobalState, GlobalStateSetType, GlobalStateSetValuesType, StateType, StoreType } from './types';
/**
 * https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 */
export declare const createStore: (initialState?: StateType) => StoreType;
export declare function createGlobalState<T>(defaultValue: T, { name, persist }?: CreateStoreOptions): GlobalState<T>;
export declare const useGlobalState: <T>(state: GlobalState<T>) => GlobalStateSetValuesType<T>;
export declare const useGlobalGetter: <T>(stateInstance: GlobalState<T>) => T;
export declare const getStateValue: <T>(state: StateType, stateInstance: GlobalState<T>) => any;
export declare const useGlobalSetter: <T>(stateInstance: GlobalState<T>) => (handler: GlobalStateSetType<T>) => void;

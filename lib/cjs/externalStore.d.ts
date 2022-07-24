import { StateType, StoreType } from './types';
/**
 * https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 */
export declare const createStore: (initialState?: StateType) => StoreType;
export declare const useStore: <T>(store: StoreType, propertyName: string) => T;

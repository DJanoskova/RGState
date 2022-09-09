export declare type StoreListenerType = () => void;
export declare type StateType = Record<string, any>;
export declare type SetStateType = (previous: StateType) => StateType;
export declare type StoreType = {
    getState: () => StateType;
    setState: (fn: SetStateType) => void;
    subscribe: (listener: StoreListenerType) => () => void;
};
export declare type GlobalStateSetType<T> = T | ((previous: T, state: StateType) => T);
export declare type GlobalStateSetValuesType<T> = [T, (handler: GlobalStateSetType<T>) => void];
export interface GlobalState<T> {
    _id: string;
    _defaultValue: T;
    _persist: boolean;
}
export interface CreateStoreOptions {
    name?: string;
    persist?: boolean;
}

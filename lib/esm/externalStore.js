import { useCallback, useSyncExternalStore } from 'react';
/**
 * https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 */
export var createStore = function (initialState) {
    if (initialState === void 0) { initialState = {}; }
    var state = initialState;
    var getState = function () { return state; };
    var listeners = new Set();
    var setState = function (fn) {
        state = fn(state);
        listeners.forEach(function (l) { return l(); });
    };
    var subscribe = function (listener) {
        listeners.add(listener);
        return function () {
            listeners.delete(listener);
        };
    };
    return { getState: getState, setState: setState, subscribe: subscribe };
};
export var useStore = function (store, propertyName) {
    var getSnapshot = useCallback(function () { return store.getState()[propertyName]; }, [store, propertyName]);
    return useSyncExternalStore(store.subscribe, getSnapshot);
};

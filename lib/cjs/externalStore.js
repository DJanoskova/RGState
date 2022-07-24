"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = exports.createStore = void 0;
var react_1 = require("react");
/**
 * https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 */
var createStore = function (initialState) {
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
exports.createStore = createStore;
var useStore = function (store, propertyName) {
    var getSnapshot = (0, react_1.useCallback)(function () { return store.getState()[propertyName]; }, [store, propertyName]);
    return (0, react_1.useSyncExternalStore)(store.subscribe, getSnapshot);
};
exports.useStore = useStore;

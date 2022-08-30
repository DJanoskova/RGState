"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalSetter = exports.useGlobalGetter = exports.useGlobalState = exports.createGlobalState = exports.createStore = void 0;
var react_1 = require("react");
var uuid_1 = require("uuid");
var externalStore_1 = require("./externalStore");
var store;
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
function createGlobalState(defaultValue, _a) {
    var _b = _a === void 0 ? {} : _a, name = _b.name;
    if (!store)
        store = (0, exports.createStore)();
    if (name) {
        var existingValue = store.getState()[name];
        if (existingValue)
            return existingValue;
    }
    return {
        _defaultValue: defaultValue,
        _id: name || (0, uuid_1.v4)(),
    };
}
exports.createGlobalState = createGlobalState;
var useGlobalState = function (state) {
    var value = (0, exports.useGlobalGetter)(state);
    var handleSet = (0, exports.useGlobalSetter)(state);
    return [value, handleSet];
};
exports.useGlobalState = useGlobalState;
var useGlobalGetter = function (stateInstance) {
    if (!store)
        store = (0, exports.createStore)();
    var value = (0, externalStore_1.useStore)(store, stateInstance._id);
    return value === undefined ? stateInstance._defaultValue : value;
};
exports.useGlobalGetter = useGlobalGetter;
var useGlobalSetter = function (stateInstance) {
    var handleStateSet = (0, react_1.useCallback)(function (handler) {
        var setter = function (previous) {
            var _a;
            var displayedName = stateInstance._id;
            var result;
            if (typeof handler === 'function') {
                var previousValue = previous[displayedName] === undefined ? stateInstance._defaultValue : previous[displayedName];
                // @ts-ignore
                result = handler(previousValue);
            }
            else {
                result = handler;
            }
            return __assign(__assign({}, previous), (_a = {}, _a[displayedName] = result, _a));
        };
        if (!store)
            store = (0, exports.createStore)();
        store.setState(setter);
    }, [stateInstance._defaultValue, stateInstance._id]);
    return handleStateSet;
};
exports.useGlobalSetter = useGlobalSetter;

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
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createStore, useStore } from './externalStore';
var store = createStore();
export var createGlobalState = function (defaultValue) {
    return {
        _defaultValue: defaultValue,
        _id: uuidv4(),
    };
};
export var useGlobalState = function (state) {
    var value = useGlobalGetter(state);
    var handleSet = useGlobalSetter(state);
    return [value, handleSet];
};
export var useGlobalGetter = function (stateInstance) {
    var value = useStore(store, stateInstance._id);
    return value === undefined ? stateInstance._defaultValue : value;
};
export var useGlobalSetter = function (stateInstance) {
    var handleStateSet = useCallback(function (handler) {
        var setter = function (previous) {
            var _a;
            var displayedName = stateInstance._id;
            var result;
            if (typeof handler === 'function') {
                var previousValue = previous[displayedName] === undefined ? stateInstance._defaultValue : previous[displayedName];
                // @ts-ignore
                result = handler(previousValue, previous);
            }
            else {
                result = handler;
            }
            return __assign(__assign({}, previous), (_a = {}, _a[displayedName] = result, _a));
        };
        store.setState(setter);
    }, [stateInstance._defaultValue, stateInstance._id]);
    return handleStateSet;
};

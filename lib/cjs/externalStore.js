"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
var react_1 = require("react");
var useStore = function (store, propertyName) {
    var getSnapshot = (0, react_1.useCallback)(function () { return store.getState()[propertyName]; }, [store, propertyName]);
    return (0, react_1.useSyncExternalStore)(store.subscribe, getSnapshot);
};
exports.useStore = useStore;

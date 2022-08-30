import { useCallback, useSyncExternalStore } from 'react';
export var useStore = function (store, propertyName) {
    var getSnapshot = useCallback(function () { return store.getState()[propertyName]; }, [store, propertyName]);
    return useSyncExternalStore(store.subscribe, getSnapshot);
};

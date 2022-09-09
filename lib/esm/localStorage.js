var STATE_NAME = '_rgstate_local_storage';
export var getStoredState = function () {
    var value = localStorage.getItem(STATE_NAME);
    if (value)
        return JSON.parse(value);
    return {};
};
export var setStoredState = function (name, value) {
    var stored = getStoredState();
    stored[name] = value;
    localStorage.setItem(STATE_NAME, JSON.stringify(stored));
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStoredState = exports.getStoredState = void 0;
var STATE_NAME = '_rgstate_local_storage';
var getStoredState = function () {
    var value = localStorage.getItem(STATE_NAME);
    if (value)
        return JSON.parse(value);
    return {};
};
exports.getStoredState = getStoredState;
var setStoredState = function (name, value) {
    var stored = (0, exports.getStoredState)();
    stored[name] = value;
    localStorage.setItem(STATE_NAME, JSON.stringify(stored));
};
exports.setStoredState = setStoredState;

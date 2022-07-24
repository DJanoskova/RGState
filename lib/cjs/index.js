"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalSetter = exports.useGlobalGetter = exports.useGlobalState = exports.createGlobalState = void 0;
var store_1 = require("./store");
Object.defineProperty(exports, "createGlobalState", { enumerable: true, get: function () { return store_1.createGlobalState; } });
Object.defineProperty(exports, "useGlobalState", { enumerable: true, get: function () { return store_1.useGlobalState; } });
Object.defineProperty(exports, "useGlobalGetter", { enumerable: true, get: function () { return store_1.useGlobalGetter; } });
Object.defineProperty(exports, "useGlobalSetter", { enumerable: true, get: function () { return store_1.useGlobalSetter; } });

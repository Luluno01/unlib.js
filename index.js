"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generators_1 = require("./Generators");
var Random_1 = require("./Random");
var Constants_1 = require("./Constants");
var Binary_1 = require("./Binary");
var Timer_1 = require("./Timer");
var Prom_1 = require("./Prom");
var fs_1 = require("./fs");
var _default = {
    Random: Random_1.Random,
    Generators: Generators_1.Generators,
    Constants: Constants_1.Constants,
    Binary: Binary_1.Binary,
    Timer: Timer_1.Timer,
    Promise: Prom_1.Prom,
    fs: fs_1.fs
};
exports.default = _default;
try {
    // Object.assign(module.exports, _default)
    for (var key in _default)
        module.exports[key] = _default[key];
}
catch (_a) {
}

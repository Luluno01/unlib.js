"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generators_1 = require("./Generators");
var Random_1 = require("./Random");
var Constants_1 = require("./Constants");
var Binary_1 = require("./Binary");
var Time_1 = require("./Time");
var Prom_1 = require("./Prom");
var fs = require("./fs");
var unlib = {
    Random: Random_1.default,
    Generators: Generators_1.default,
    Constants: Constants_1.default,
    Binary: Binary_1.default,
    Time: Time_1.default,
    Promise: Prom_1.default,
    fs: fs.default
};
exports.default = unlib;
try {
    // Object.assign(module.exports, _default)
    for (var key in unlib)
        module.exports[key] = unlib[key];
}
catch (_a) {
}

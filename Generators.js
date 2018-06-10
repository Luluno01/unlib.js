"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Random_1 = require("./Random");
var Generators;
(function (Generators) {
    /**
     * @description A generator that generates a sequence ranged [`a`, `b`) at a pace of `step` per step.
     * @param a The lower bound.
     * @param b Optional. The upper bound. If not set, the range would be [0, `a`).
     * @param step Optional. Defaults to 1. Step.
     */
    function range(a, b, step) {
        var _c, i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (step === void 0) { step = 1; }
                    if (b == undefined) {
                        _c = __read([0, a], 2), a = _c[0], b = _c[1];
                    }
                    i = a;
                    _d.label = 1;
                case 1:
                    if (!(i < b)) return [3 /*break*/, 4];
                    return [4 /*yield*/, i];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    i += step;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }
    Generators.range = range;
    /**
     * @description A generator that generates a characters sequence ranged [`a`, `b`] at a pace of `step` per step.
     * @param a The lower bound.
     * @param b The upper bound.
     * @param step Optional. Defaults to 1. Step.
     */
    function charRange(a, b, step) {
        var _a, _b, i;
        if (step === void 0) { step = 1; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = a.charCodeAt(0);
                    _b = b.charCodeAt(0);
                    i = _a;
                    _c.label = 1;
                case 1:
                    if (!(i <= _b)) return [3 /*break*/, 4];
                    return [4 /*yield*/, String.fromCharCode(i)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    i += step;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }
    Generators.charRange = charRange;
    /**
     * @description Combine all the generators passed as parameters into a new generator.
     * @param ranges Range generators to combine together.
     */
    function newRange() {
        var e_1, _c, _i, ranges_1, ranges_1_1, range_1, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    var ranges = [];
                    for (_i = 0; _i < arguments.length; _i++) {
                        ranges[_i] = arguments[_i];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    ranges_1 = __values(ranges), ranges_1_1 = ranges_1.next();
                    _d.label = 2;
                case 2:
                    if (!!ranges_1_1.done) return [3 /*break*/, 5];
                    range_1 = ranges_1_1.value;
                    return [5 /*yield**/, __values(range_1)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    ranges_1_1 = ranges_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (ranges_1_1 && !ranges_1_1.done && (_c = ranges_1.return)) _c.call(ranges_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }
    Generators.newRange = newRange;
    /**
     * @description A generator that generates a random sequence whose items are chosen from `arr`.
     * @param arr An array of candidates or a generator.
     * @param length The length of generated sequence.
     */
    function randSeq(arr, length) {
        var i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (arr.next && arr[Symbol.iterator])
                        arr = Array.from(arr); // [...arr]
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, arr[Random_1.default.randint(arr.length)]];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }
    Generators.randSeq = randSeq;
})(Generators || (Generators = {}));
exports.default = Generators;
try {
    // Object.assign(module.exports, _default)
    for (var key in Generators)
        module.exports[key] = Generators[key];
}
catch (_c) {
}

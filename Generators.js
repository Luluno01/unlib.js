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
        if (step === void 0) { step = 1; }
        var i, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (b == undefined) {
                        _c = [0, a], a = _c[0], b = _c[1];
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
        if (step === void 0) { step = 1; }
        var _a, _b, i;
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
                    return [4 /*yield*/, arr[Random_1.Random.randint(arr.length)]];
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
})(Generators = exports.Generators || (exports.Generators = {}));

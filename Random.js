"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var Generators_1 = require("./Generators");
var Random;
(function (Random) {
    /**
     * @description Same as `Math random`.
     * @returns {number} Same as `Math.random`.
     */
    function rand() {
        return Math.random();
    }
    Random.rand = rand;
    /**
     * @description Generate a **floating-point** number randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
     * @param a The lower bound of the generated number.
     * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
     * @returns {number} Generated floating-point number.
     */
    function random(a, b) {
        if (b == undefined) {
            _a = __read([0, a], 2), a = _a[0], b = _a[1];
        }
        return Math.random() * (b - a) + a;
        var _a;
    }
    Random.random = random;
    /**
     * @description Generate an **integer** randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
     * @param a The lower bound of the generated number.
     * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
     * @returns {number} Generated integer.
     */
    function randint(a, b) {
        return Math.floor(Random.random(a, b));
    }
    Random.randint = randint;
    /**
     * @description Perform a sampling.
     * @param arr The population to sample.
     * @param count The expected number of samples.
     * @param protect Optional. Defaults to `false`. Whether to protect `arr` during sampling. If false, `arr.splice` will be used.
     * @returns {any[]} An array of resulted samples.
     */
    function sample(arr, count, protect) {
        if (protect) {
            var indexes = [];
            for (var i = 0; i < arr.length; i++) {
                indexes.push(false);
            }
            var res = [];
            while (res.length < count && res.length != arr.length) {
                var index = Random.randint(arr.length);
                if (indexes[index])
                    continue;
                indexes[index] = true;
                res.push(arr[index]);
            }
            return res;
        }
        else {
            var res = [];
            while (res.length < count && arr.length) {
                res.push.apply(res, __spread(arr.splice(Random.randint(arr.length), 1)));
            }
            return res;
        }
    }
    Random.sample = sample;
    /**
     * @description Shuffle the items in the array given.
     * @param arr The array with items to shuffle.
     * @param protect Optional. Defaults to false. Whether to protect `arr` during shuffle.
     * @returns {any[]} The array that has been shuffled.
     */
    function shuffle(arr, protect) {
        var res = Random.sample(arr, arr.length, protect);
        if (!protect) {
            arr.push.apply(arr, __spread(res));
        }
        return res;
    }
    Random.shuffle = shuffle;
    /**
     * @description Generate a random sequence whose items are chosen from `arr`.
     * @param arr An array of candidates or a generator.
     * @param length The length of generated sequence.
     * @returns {any[]} Generated sequence.
     */
    function randSeq(arr, length) {
        return Array.from(Generators_1.Generators.randSeq(arr, length));
    }
    Random.randSeq = randSeq;
    /**
     * @description Generate a random string whose characters are chosen from `arr`.
     * @param arr A candidate string or an array of candidates string or a generator.
     * @param length The length of generated string.
     */
    function randStr(arr, length) {
        if (arr === void 0) { arr = Constants_1.Constants.VISIBLE_ASCII_CHAR; }
        return Array.from(Generators_1.Generators.randSeq(arr, length)).join('');
    }
    Random.randStr = randStr;
})(Random = exports.Random || (exports.Random = {}));

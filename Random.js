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
var Constants_1 = require("./Constants");
var Generators_1 = require("./Generators");
var Random;
(function (Random) {
    /**
     * @description Same as `Math random`.
     * @returns {number} Same as `Math.random`.
     */
    Random.rand = Math.random;
    /**
     * @description Generate a **floating-point** number randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
     * @param a The lower bound of the generated number.
     * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
     * @returns {number} Generated floating-point number.
     */
    function random(a, b) {
        var _a;
        if (b == undefined) {
            _a = __read([0, a], 2), a = _a[0], b = _a[1];
        }
        return Math.random() * (b - a) + a;
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
     * @returns {Array<T>} An array of resulted samples.
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
     * @returns {Array<T>} The array that has been shuffled.
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
     * @returns {Array<T>} Generated sequence.
     */
    function randSeq(arr, length) {
        return Array.from(Generators_1.default.randSeq(arr, length));
    }
    Random.randSeq = randSeq;
    /**
     * @description Generate a random string whose characters are chosen from `arr`.
     * @param arr A candidate string or an array of candidates string or a generator.
     * @param length The length of generated string.
     * @returns {string} Generated string.
     */
    function randStr(arr, length) {
        if (arr === void 0) { arr = Constants_1.default.VISIBLE_ASCII_CHAR; }
        return Array.from(Generators_1.default.randSeq(arr, length)).join('');
    }
    Random.randStr = randStr;
    /**
     * @description A useless function that simulates a single vote.
     * @param candidates Candidates to vote for.
     * @returns The index of candidate being voted.
     */
    function vote(candidates) {
        var voteFor = randint(candidates.length);
        candidates[voteFor].votes++;
        return voteFor;
    }
    Random.vote = vote;
    /**
     * @description A useless function that simulates an election.
     * @param candidates Candidates for the election.
     * @param maxVotes Max votes to win.
     */
    function elect(candidates, maxVotes) {
        var e_1, _a;
        candidates.forEach(function (candidate) { return candidate.votes = 0; });
        var res = { winner: null, records: [] };
        while (true) {
            try {
                for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                    var candidate = candidates_1_1.value;
                    if (candidate.votes >= maxVotes) {
                        res.winner = candidate;
                        return res;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            res.records.push(vote(candidates));
        }
    }
    Random.elect = elect;
})(Random || (Random = {}));
exports.default = Random;
try {
    // Object.assign(module.exports, _default)
    for (var key in Random)
        module.exports[key] = Random[key];
}
catch (_a) {
}

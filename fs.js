"use strict";
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
var e_1, _a;
var Prom_1 = require("./Prom");
var _fs = require("fs");
var path = require("path");
var util = require("util");
var pfs = Prom_1.default.promisifyAll(_fs, Object.keys(_fs), util.promisify);
var exceptions = ['Stats', 'watch', 'watchFile', 'unwatchFile', 'createReadStream', 'ReadStream', 'FileReadStream', 'createWriteStream', 'WriteStream', 'FileWriteStream'];
try {
    for (var exceptions_1 = __values(exceptions), exceptions_1_1 = exceptions_1.next(); !exceptions_1_1.done; exceptions_1_1 = exceptions_1.next()) {
        var property = exceptions_1_1.value;
        pfs[property] = _fs[property];
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (exceptions_1_1 && !exceptions_1_1.done && (_a = exceptions_1.return)) _a.call(exceptions_1);
    }
    finally { if (e_1) throw e_1.error; }
}
/**
 * @description Make a directory recursively.
 * @param dirname Path to target directory.
 * @returns {Promise<any>}
 * @author Zezhong Xu
 */
function mkdirs(dirname) {
    return new Promise(function (resolve, reject) {
        // console.log(`Attempt to make ${dirname}`)
        return pfs.exists(dirname)
            .then(function (exists) {
            if (exists) {
                // console.log(`Directory ${dirname} exists, done`)
                return resolve();
            }
            else {
                // console.log(`Directory ${dirname} doesn't exist`)
                return mkdirs(path.dirname(dirname))
                    .then(function () {
                    return pfs.mkdir(dirname)
                        .then(function () {
                        // console.log(`Directory ${dirname} made`)
                        resolve();
                    })
                        .catch(function (err) {
                        if (err.code != 'EEXIST')
                            reject(err); // Ignore error if directory has already been created
                        else {
                            // console.log(`Directory ${dirname} already made`)
                            resolve();
                        }
                    });
                })
                    .catch(reject);
            }
        });
    });
}
pfs.mkdirs = mkdirs;
/**
 * @description Remove a file or directory recursively.
 * @param filename Path to a file or directory to remove.
 * @returns {Promise<any>}
 */
function rm(filename) {
    function deleteSubs(filename) {
        return new Promise(function (resolve, reject) {
            return pfs.readdir(filename)
                .then(function (files) {
                // Resolve after deleting all its contents
                return Promise.all(files.map(function (file) { return rm(path.join(filename, file)); }));
            })
                .then(resolve)
                .catch(reject);
        });
    }
    return new Promise(function (resolve, reject) {
        return pfs.stat(filename)
            .then(function (stat) {
            if (stat.isDirectory()) {
                return deleteSubs(filename)
                    .then(function () {
                    // After deleting all its contents, delete the directory itself
                    // console.log('I\'m going to delete the directory: ' + filename);
                    return pfs.rmdir(filename);
                });
            }
            else { // `unlink` directly
                // console.log('I\'m going to delete the file: ' + filename);
                return pfs.unlink(filename);
            }
        })
            .then(resolve)
            .catch(reject);
    });
}
pfs.rm = rm;
exports.default = pfs;
try {
    for (var key in pfs)
        module.exports[key] = pfs[key];
}
catch (_b) {
}

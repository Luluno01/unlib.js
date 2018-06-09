import { Prom } from './Prom'
import * as _fs from 'fs'
import * as path from 'path'
import * as util from 'util'

let pfs: any = Prom.promisifyAll(_fs, Object.keys(_fs), util.promisify) as any

/**
 * @description Make a directory recursively.
 * @param dirname Path to target directory.
 * @returns {Promise<any>}
 * @author Zezhong Xu
 */
function mkdirs(dirname: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // console.log(`Attempt to make ${dirname}`)
    return pfs.exists(dirname)
    .then(exists => {
      if(exists) {
        // console.log(`Directory ${dirname} exists, done`)
        return resolve()
      } else {
        // console.log(`Directory ${dirname} doesn't exist`)
        return mkdirs(path.dirname(dirname))
        .then(() => {
          return pfs.mkdir(dirname)
          .then(() => {
            // console.log(`Directory ${dirname} made`)
            resolve()
          })
          .catch(err => {
            if(err.code != 'EEXIST') reject(err)  // Ignore error if directory has already been created
            else {
              // console.log(`Directory ${dirname} already made`)
              resolve()
            }
          })
        })
        .catch(reject)
      }
    })
  })
}
pfs.mkdirs = mkdirs

/**
 * @description Remove a file or directory recursively.
 * @param filename Path to a file or directory to remove.
 * @returns {Promise<any>}
 */
function rm(filename: string): Promise<void> {
  function deleteSubs(filename: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return pfs.readdir(filename)
      .then(files => {
        // Resolve after deleting all its contents
        return Promise.all(files.map(file => rm(path.join(filename, file))));
      })
      .then(resolve)
      .catch(reject);
    });
  }
  return new Promise((resolve, reject) => {
    return pfs.stat(filename)
    .then(stat => {
      if(stat.isDirectory()) {
        return deleteSubs(filename)
        .then(() => {
          // After deleting all its contents, delete the directory itself
          // console.log('I\'m going to delete the directory: ' + filename);
          return pfs.rmdir(filename);
        });
      } else {  // `unlink` directly
        // console.log('I\'m going to delete the file: ' + filename);
        return pfs.unlink(filename);
      }
    })
    .then(resolve)
    .catch(reject);
  });
}
pfs.rm = rm

export const fs = pfs
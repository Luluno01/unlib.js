import { promisifyAll } from './Prom'
import * as _fs from 'fs'
import * as path from 'path'
import * as util from 'util'

type WriteFileOption = { encoding?: string | null; mode?: number | string; flag?: string; } | string | null
type ReadFileOption = { encoding?: null; flag?: string; } | string | null
type JSONParseReviver = ((key: any, value: any) => any)
type JSONStringifyReplacerFunction = (key: string, value: any) => any
type JSONStringifyReplacerArray = (number | string)[] | null

export interface fs {
  constants: typeof _fs.constants
  Stats: typeof _fs.Stats
  F_OK: number
  R_OK: number
  W_OK: number
  X_OK: number
  access: typeof _fs.access.__promisify__
  accessSync: typeof _fs.accessSync
  exists: typeof _fs.exists.__promisify__
  existsSync: typeof _fs.existsSync
  readFile: typeof _fs.readFile.__promisify__
  readFileSync: typeof _fs.readFileSync
  close: typeof _fs.close.__promisify__
  closeSync: typeof _fs.closeSync
  open: typeof _fs.open.__promisify__
  openSync: typeof _fs.openSync
  read: typeof _fs.read.__promisify__
  readSync: typeof _fs.readSync
  write: typeof _fs.write.__promisify__
  writeSync: typeof _fs.writeSync
  rename: typeof _fs.rename.__promisify__
  renameSync: typeof _fs.renameSync
  truncate: typeof _fs.truncate.__promisify__
  truncateSync: typeof _fs.truncateSync
  ftruncate: typeof _fs.ftruncate.__promisify__
  ftruncateSync: typeof _fs.ftruncateSync
  rmdir: typeof _fs.rmdir.__promisify__
  rmdirSync: typeof _fs.rmdirSync
  fdatasync: typeof _fs.fdatasync.__promisify__
  fdatasyncSync: typeof _fs.fdatasyncSync
  fsync: typeof _fs.fsync.__promisify__
  fsyncSync: typeof _fs.fsyncSync
  mkdir: typeof _fs.mkdir.__promisify__
  mkdirSync: typeof _fs.mkdirSync
  readdir: typeof _fs.readdir.__promisify__
  readdirSync: typeof _fs.readdirSync
  fstat: typeof _fs.fstat.__promisify__
  lstat: typeof _fs.lstat.__promisify__
  stat: typeof _fs.stat.__promisify__
  fstatSync: typeof _fs.fstatSync
  lstatSync: typeof _fs.lstatSync
  statSync: typeof _fs.statSync
  readlink: typeof _fs.readlink.__promisify__
  readlinkSync: typeof _fs.readlinkSync
  symlink: typeof _fs.symlink.__promisify__
  symlinkSync: typeof _fs.symlinkSync
  link: (existingPath: _fs.PathLike, newPath: _fs.PathLike) => Promise<void>
  linkSync: typeof _fs.linkSync
  unlink: typeof _fs.unlink.__promisify__
  unlinkSync: typeof _fs.unlinkSync
  fchmod: typeof _fs.fchmod.__promisify__
  fchmodSync: typeof _fs.fchmodSync
  chmod: typeof _fs.chmod.__promisify__
  chmodSync: typeof _fs.chmodSync
  fchown: typeof _fs.fchown.__promisify__
  fchownSync: typeof _fs.fchownSync
  chown: typeof _fs.chown.__promisify__
  chownSync: typeof _fs.chownSync
  utimes: typeof _fs.utimes.__promisify__
  utimesSync: typeof _fs.utimesSync
  futimes: typeof _fs.futimes.__promisify__
  futimesSync: typeof _fs.futimesSync
  writeFile: typeof _fs.writeFile.__promisify__
  writeFileSync: typeof _fs.writeFileSync
  appendFile: typeof _fs.appendFile.__promisify__
  appendFileSync: typeof _fs.appendFileSync

  /* Cannot be promisified */
  watch: typeof _fs.watch
  watchFile: typeof _fs.watchFile
  unwatchFile: typeof _fs.unwatchFile

  realpathSync: typeof _fs.realpathSync
  realpath: typeof _fs.realpath.__promisify__
  mkdtemp: typeof _fs.mkdtemp.__promisify__
  mkdtempSync: typeof _fs.mkdtempSync
  copyFile: typeof _fs.copyFile.__promisify__
  copyFileSync: typeof _fs.copyFileSync

  /* Cannot be promisified */
  createReadStream: typeof _fs.createReadStream
  ReadStream: typeof _fs.ReadStream
  FileReadStream: any  // Not listed in @types/node/index.d.ts
  createWriteStream: typeof _fs.createWriteStream
  WriteStream: typeof _fs.WriteStream
  FileWriteStream: any  // Not listed in @types/node/index.d.ts

  /* Custom functions below  */
  /**
   * @description Make a directory recursively.
   * @param dirname Path to target directory.
   * @returns {Promise<any>}
   * @author Zezhong Xu
   */
  mkdirs(dirname: string): Promise<void>
  
  /**
   * @description Remove a file or directory recursively.
   * @param filename Path to a file or directory to remove.
   * @returns {Promise<any>}
   */
  rm(filename: string): Promise<void>

  /**
   * @description Dump a JavaScript value to a JavaScript Object Notation (JSON) string file.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * URL support is _experimental_.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
   * If `encoding` is not supplied, the default of `'utf8'` is used.
   * If `mode` is not supplied, the default of `0o666` is used.
   * If `mode` is a string, it is parsed as an octal integer.
   * If `flag` is not supplied, the default of `'w'` is used.
   * @returns {(value: any, replacer: JSONStringifyReplacerFunction | JSONStringifyReplacerArray, space?: string | number) => Promise<void>} A function that writes stringified `value` and returns a promise object.
   * Returned function receives a `value` parameter and a `replacer` parameter, which are exactly the same as `JSON.stringify`'s.
   */
  dumpJSON(path: _fs.PathLike | number, options?: WriteFileOption): (value: any, replacer: JSONStringifyReplacerFunction | JSONStringifyReplacerArray, space?: string | number) => Promise<void>

  /**
   * @description Load from a JSON string file into an object
   * @param path Same as `fs.readFile`'s. A path to a JSON string file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param options Same as `fs.readFile`'s. An object that may contain an optional flag.
   * If a flag is not provided, it defaults to `'r'`.
   * @returns {(reviver?: JSONParseReviver) => Promise<any>} A function that reads from a JSON string file from `path` and returns a promise object.
   * Returned function receives a `reviver` parameter, which is exactly the same as `JSON.parse`'s.
   */
  loadJSON(path: _fs.PathLike | number, options?: ReadFileOption): (reviver?: JSONParseReviver) => Promise<any>
}
const pfs: fs = promisifyAll(_fs, Object.keys(_fs), util.promisify) as fs

const exceptions: string[] = [
  'Stats',
  'watch',
  'watchFile',
  'unwatchFile',
  'createReadStream',
  'ReadStream',
  'FileReadStream',
  'createWriteStream',
  'WriteStream',
  'FileWriteStream'
]
for(const property of exceptions) {
  pfs[property] = _fs[property]
}

/* Start of export of promisified built-in properties */
export const constants: typeof _fs.constants = pfs.constants
export const Stats: typeof _fs.Stats = pfs.Stats
export const F_OK: number = pfs.F_OK
export const R_OK: number = pfs.R_OK
export const W_OK: number = pfs.W_OK
export const X_OK: number = pfs.X_OK
export const access: typeof _fs.access.__promisify__ = pfs.access
export const accessSync: typeof _fs.accessSync = pfs.accessSync
export const exists: typeof _fs.exists.__promisify__ = pfs.exists
export const existsSync: typeof _fs.existsSync = pfs.existsSync
export const readFile: typeof _fs.readFile.__promisify__ = pfs.readFile
export const readFileSync: typeof _fs.readFileSync = pfs.readFileSync
export const close: typeof _fs.close.__promisify__ = pfs.close
export const closeSync: typeof _fs.closeSync = pfs.closeSync
export const open: typeof _fs.open.__promisify__ = pfs.open
export const openSync: typeof _fs.openSync = pfs.openSync
export const read: typeof _fs.read.__promisify__ = pfs.read
export const readSync: typeof _fs.readSync = pfs.readSync
export const write: typeof _fs.write.__promisify__ = pfs.write
export const writeSync: typeof _fs.writeSync = pfs.writeSync
export const rename: typeof _fs.rename.__promisify__ = pfs.rename
export const renameSync: typeof _fs.renameSync = pfs.renameSync
export const truncate: typeof _fs.truncate.__promisify__ = pfs.truncate
export const truncateSync: typeof _fs.truncateSync = pfs.truncateSync
export const ftruncate: typeof _fs.ftruncate.__promisify__ = pfs.ftruncate
export const ftruncateSync: typeof _fs.ftruncateSync = pfs.ftruncateSync
export const rmdir: typeof _fs.rmdir.__promisify__ = pfs.rmdir
export const rmdirSync: typeof _fs.rmdirSync = pfs.rmdirSync
export const fdatasync: typeof _fs.fdatasync.__promisify__ = pfs.fdatasync
export const fdatasyncSync: typeof _fs.fdatasyncSync = pfs.fdatasyncSync
export const fsync: typeof _fs.fsync.__promisify__ = pfs.fsync
export const fsyncSync: typeof _fs.fsyncSync = pfs.fsyncSync
export const mkdir: typeof _fs.mkdir.__promisify__ = pfs.mkdir
export const mkdirSync: typeof _fs.mkdirSync = pfs.mkdirSync
export const readdir: typeof _fs.readdir.__promisify__ = pfs.readdir
export const readdirSync: typeof _fs.readdirSync = pfs.readdirSync
export const fstat: typeof _fs.fstat.__promisify__ = pfs.fstat
export const lstat: typeof _fs.lstat.__promisify__ = pfs.lstat
export const stat: typeof _fs.stat.__promisify__ = pfs.stat
export const fstatSync: typeof _fs.fstatSync = pfs.fstatSync
export const lstatSync: typeof _fs.lstatSync = pfs.lstatSync
export const statSync: typeof _fs.statSync = pfs.statSync
export const readlink: typeof _fs.readlink.__promisify__ = pfs.readlink
export const readlinkSync: typeof _fs.readlinkSync = pfs.readlinkSync
export const symlink: typeof _fs.symlink.__promisify__ = pfs.symlink
export const symlinkSync: typeof _fs.symlinkSync = pfs.symlinkSync
export const link: (existingPath: _fs.PathLike, newPath: _fs.PathLike) => Promise<void> = pfs.link
export const linkSync: typeof _fs.linkSync = pfs.linkSync
export const unlink: typeof _fs.unlink.__promisify__ = pfs.unlink
export const unlinkSync: typeof _fs.unlinkSync = pfs.unlinkSync
export const fchmod: typeof _fs.fchmod.__promisify__ = pfs.fchmod
export const fchmodSync: typeof _fs.fchmodSync = pfs.fchmodSync
export const chmod: typeof _fs.chmod.__promisify__ = pfs.chmod
export const chmodSync: typeof _fs.chmodSync = pfs.chmodSync
export const fchown: typeof _fs.fchown.__promisify__ = pfs.fchown
export const fchownSync: typeof _fs.fchownSync = pfs.fchownSync
export const chown: typeof _fs.chown.__promisify__ = pfs.chown
export const chownSync: typeof _fs.chownSync = pfs.chownSync
export const utimes: typeof _fs.utimes.__promisify__ = pfs.utimes
export const utimesSync: typeof _fs.utimesSync = pfs.utimesSync
export const futimes: typeof _fs.futimes.__promisify__ = pfs.futimes
export const futimesSync: typeof _fs.futimesSync = pfs.futimesSync
export const writeFile: typeof _fs.writeFile.__promisify__ = pfs.writeFile
export const writeFileSync: typeof _fs.writeFileSync = pfs.writeFileSync
export const appendFile: typeof _fs.appendFile.__promisify__ = pfs.appendFile
export const appendFileSync: typeof _fs.appendFileSync = pfs.appendFileSync

/* Cannot be promisified */
export const watch: typeof _fs.watch = pfs.watch
export const watchFile: typeof _fs.watchFile = pfs.watchFile
export const unwatchFile: typeof _fs.unwatchFile = pfs.unwatchFile

export const realpathSync: typeof _fs.realpathSync = pfs.realpathSync
export const realpath: typeof _fs.realpath.__promisify__ = pfs.realpath
export const mkdtemp: typeof _fs.mkdtemp.__promisify__ = pfs.mkdtemp
export const mkdtempSync: typeof _fs.mkdtempSync = pfs.mkdtempSync
export const copyFile: typeof _fs.copyFile.__promisify__ = pfs.copyFile
export const copyFileSync: typeof _fs.copyFileSync = pfs.copyFileSync

/* Cannot be promisified */
export const createReadStream: typeof _fs.createReadStream = pfs.createReadStream
export const ReadStream: typeof _fs.ReadStream = pfs.ReadStream
export const FileReadStream: any = pfs.FileReadStream  // Not listed in @types/node/index.d.ts
export const createWriteStream: typeof _fs.createWriteStream = pfs.createWriteStream
export const WriteStream: typeof _fs.WriteStream = pfs.WriteStream
export const FileWriteStream: any = pfs.FileWriteStream  // Not listed in @types/node/index.d.ts
/* End of export of promisified built-in properties */

/**
 * @description Make a directory recursively.
 * @param dirname Path to target directory.
 * @returns {Promise<void>}
 */
export async function mkdirs(dirname: string): Promise<void> {
  if(await pfs.exists(dirname)) {
    return
  }
  await mkdirs(path.dirname(dirname))
  try {
    await pfs.mkdir(dirname)
  } catch(err) {
    if(err.code != 'EEXIST') throw err
  }
}

/**
 * @description Remove a file or directory recursively.
 * @param filename Path to a file or directory to remove.
 * @returns {Promise<void>}
 */
export async function rm(filename: string): Promise<void> {
  async function deleteSubs(filename: string): Promise<void> {
    await Promise.all((await pfs.readdir(filename))
      .map(file => rm(path.join(filename, file)))
    )
  }
  if((await pfs.stat(filename)).isDirectory()) {
    await deleteSubs(filename)
    // After deleting all its contents, delete the directory itself
    await pfs.rmdir(filename)
  } else {  // `unlink` directly
    await pfs.unlink(filename)
  }
}

/**
 * @description Dump a JavaScript value to a JavaScript Object Notation (JSON) string file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'w'` is used.
 * @returns {(value: any, replacer: JSONStringifyReplacerFunction | JSONStringifyReplacerArray, space?: string | number) => Promise<void>} A function that writes stringified `value` and returns a promise object.
 * Returned function receives a `value` parameter and a `replacer` parameter, which are exactly the same as `JSON.stringify`'s.
 */
export function dumpJSON(path: _fs.PathLike | number, options?: WriteFileOption): (value: any, replacer: JSONStringifyReplacerFunction | JSONStringifyReplacerArray, space?: string | number) => Promise<void> {
  return async (value: any, replacer: JSONStringifyReplacerFunction | JSONStringifyReplacerArray, space?: string | number): Promise<void> => {
    const str = JSON.stringify(value, replacer as any, space)
    await pfs.writeFile(path, str, options)
  }
}

/**
 * @description Load from a JSON string file into an object
 * @param path Same as `fs.readFile`'s. A path to a JSON string file. If a URL is provided, it must use the `file:` protocol.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options Same as `fs.readFile`'s. An object that may contain an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 * @returns {(reviver?: JSONParseReviver) => Promise<any>} A function that reads from a JSON string file from `path` and returns a promise object.
 * Returned function receives a `reviver` parameter, which is exactly the same as `JSON.parse`'s.
 */
export function loadJSON(path: _fs.PathLike | number, options?: ReadFileOption): (reviver?: JSONParseReviver) => Promise<any> {
  return async (reviver?: JSONParseReviver): Promise<any> => {
    const data = await pfs.readFile(path, options)
    return JSON.parse(data.toString(), reviver)
  }
}
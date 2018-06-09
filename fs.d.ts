import * as _fs from 'fs'
import * as util from 'util'

declare namespace fs {
  /**
   * @description Make a directory recursively.
   * @param dirname Path to target directory.
   * @returns {Promise<any>}
   * @author Zezhong Xu
   */
  export function mkdirs(dirname: string): Promise<void>

  /**
   * @description Remove a file or directory recursively.
   * @param filename Path to a file or directory to remove.
   * @returns {Promise<any>}
   */
  export function rm(filename: string): Promise<void>

  export const access: typeof _fs.access.__promisify__
  export const exists: typeof _fs.exists.__promisify__
  export const readFile: typeof _fs.readFile.__promisify__
  export const close: typeof _fs.close.__promisify__
  export const open: typeof _fs.open.__promisify__
  export const read: typeof _fs.read.__promisify__
  export const write: typeof _fs.write.__promisify__
  export const rename: typeof _fs.rename.__promisify__
  export const truncate: typeof _fs.truncate.__promisify__
  export const ftruncate: typeof _fs.ftruncate.__promisify__
  export const rmdir: typeof _fs.rmdir.__promisify__
  export const fdatasync: typeof _fs.fdatasync.__promisify__
  export const fsync: typeof _fs.fsync.__promisify__
  export const mkdir: typeof _fs.mkdir.__promisify__
  export const readdir: typeof _fs.readdir.__promisify__
  export const fstat: typeof _fs.fstat.__promisify__
  export const lstat: typeof _fs.lstat.__promisify__
  export const stat: typeof _fs.stat.__promisify__
  export const readlink: typeof _fs.readlink.__promisify__
  export const symlink: typeof _fs.symlink.__promisify__
  export const link: typeof _fs.link.link
  export const unlink: typeof _fs.unlink.__promisify__
  export const fchmod: typeof _fs.fchmod.__promisify__
  export const chmod: typeof _fs.chmod.__promisify__
  export const fchown: typeof _fs.fchown.__promisify__
  export const chown: typeof _fs.chown.__promisify__
  export const utimes: typeof _fs.utimes.__promisify__
  export const futimes: typeof _fs.futimes.__promisify__
  export const writeFile: typeof _fs.writeFile.__promisify__
  export const appendFile: typeof _fs.appendFile.__promisify__
  export const realpath: typeof _fs.realpath.__promisify__
  export const mkdtemp: typeof _fs.mkdtemp.__promisify__
  export const copyFile: typeof _fs.copyFile.__promisify__
}
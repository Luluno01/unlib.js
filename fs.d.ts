/// <reference types="node" />
import * as _fs from 'fs';
export interface fs {
    constants: typeof _fs.constants;
    Stats: typeof _fs.Stats;
    F_OK: number;
    R_OK: number;
    W_OK: number;
    X_OK: number;
    access: typeof _fs.access.__promisify__;
    accessSync: typeof _fs.accessSync;
    exists: typeof _fs.exists.__promisify__;
    existsSync: typeof _fs.existsSync;
    readFile: typeof _fs.readFile.__promisify__;
    readFileSync: typeof _fs.readFileSync;
    close: typeof _fs.close.__promisify__;
    closeSync: typeof _fs.closeSync;
    open: typeof _fs.open.__promisify__;
    openSync: typeof _fs.openSync;
    read: typeof _fs.read.__promisify__;
    readSync: typeof _fs.readSync;
    write: typeof _fs.write.__promisify__;
    writeSync: typeof _fs.writeSync;
    rename: typeof _fs.rename.__promisify__;
    renameSync: typeof _fs.renameSync;
    truncate: typeof _fs.truncate.__promisify__;
    truncateSync: typeof _fs.truncateSync;
    ftruncate: typeof _fs.ftruncate.__promisify__;
    ftruncateSync: typeof _fs.ftruncateSync;
    rmdir: typeof _fs.rmdir.__promisify__;
    rmdirSync: typeof _fs.rmdirSync;
    fdatasync: typeof _fs.fdatasync.__promisify__;
    fdatasyncSync: typeof _fs.fdatasyncSync;
    fsync: typeof _fs.fsync.__promisify__;
    fsyncSync: typeof _fs.fsyncSync;
    mkdir: typeof _fs.mkdir.__promisify__;
    mkdirSync: typeof _fs.mkdirSync;
    readdir: typeof _fs.readdir.__promisify__;
    readdirSync: typeof _fs.readdirSync;
    fstat: typeof _fs.fstat.__promisify__;
    lstat: typeof _fs.lstat.__promisify__;
    stat: typeof _fs.stat.__promisify__;
    fstatSync: typeof _fs.fstatSync;
    lstatSync: typeof _fs.lstatSync;
    statSync: typeof _fs.statSync;
    readlink: typeof _fs.readlink.__promisify__;
    readlinkSync: typeof _fs.readlinkSync;
    symlink: typeof _fs.symlink.__promisify__;
    symlinkSync: typeof _fs.symlinkSync;
    link: (existingPath: _fs.PathLike, newPath: _fs.PathLike) => Promise<void>;
    linkSync: typeof _fs.linkSync;
    unlink: typeof _fs.unlink.__promisify__;
    unlinkSync: typeof _fs.unlinkSync;
    fchmod: typeof _fs.fchmod.__promisify__;
    fchmodSync: typeof _fs.fchmodSync;
    chmod: typeof _fs.chmod.__promisify__;
    chmodSync: typeof _fs.chmodSync;
    fchown: typeof _fs.fchown.__promisify__;
    fchownSync: typeof _fs.fchownSync;
    chown: typeof _fs.chown.__promisify__;
    chownSync: typeof _fs.chownSync;
    utimes: typeof _fs.utimes.__promisify__;
    utimesSync: typeof _fs.utimesSync;
    futimes: typeof _fs.futimes.__promisify__;
    futimesSync: typeof _fs.futimesSync;
    writeFile: typeof _fs.writeFile.__promisify__;
    writeFileSync: typeof _fs.writeFileSync;
    appendFile: typeof _fs.appendFile.__promisify__;
    appendFileSync: typeof _fs.appendFileSync;
    /**
     * Cannot be promisified
     */
    watch: typeof _fs.watch;
    watchFile: typeof _fs.watchFile;
    unwatchFile: typeof _fs.unwatchFile;
    realpathSync: typeof _fs.realpathSync;
    realpath: typeof _fs.realpath.__promisify__;
    mkdtemp: typeof _fs.mkdtemp.__promisify__;
    mkdtempSync: typeof _fs.mkdtempSync;
    copyFile: typeof _fs.copyFile.__promisify__;
    copyFileSync: typeof _fs.copyFileSync;
    /**
     * Cannot be promisified
     */
    createReadStream: typeof _fs.createReadStream;
    ReadStream: typeof _fs.ReadStream;
    FileReadStream: any;
    createWriteStream: typeof _fs.createWriteStream;
    WriteStream: typeof _fs.WriteStream;
    FileWriteStream: any;
    /**
     * Custom functions below
     */
    /**
     * @description Make a directory recursively.
     * @param dirname Path to target directory.
     * @returns {Promise<any>}
     * @author Zezhong Xu
     */
    mkdirs(dirname: string): Promise<void>;
    /**
     * @description Remove a file or directory recursively.
     * @param filename Path to a file or directory to remove.
     * @returns {Promise<any>}
     */
    rm(filename: string): Promise<void>;
}
declare let pfs: fs;
export default pfs;

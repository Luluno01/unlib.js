import { Readable } from 'stream'
import EventBarrier from './Sync/EventBarrier'
import { range } from './Generators'


export class ConcurrentReadError extends Error {
  public name = 'ConcurrentReadError'
}

export class InsufficientBytesError extends Error {
  public name = 'InsufficientBytesError'
}

export class InputStreamEndedError extends Error {
  public name = 'InputStreamEndedError'
}

export class StreamDetachedError extends Error {
  public name = 'StreamDetachedError'
}

/**
 * Asynchronous stream reader
 * 
 * There should be only one caller of all `read*` at the same time
 */
export class AsyncStreamReader extends EventBarrier {
  protected input?: Readable
  private bytesToRead = 0
  private cursor = 0
  private buffer!: Buffer
  private get bytesAvailable() {
    return this.buffer.length - this.cursor
  }
  private _onData = (data: Buffer) => this.onData(data)
  private _onEnd = () => this.onEnd()
  protected pendingRead = false
  public end = false
  /**
   * Constructor of `AsyncStreamReader`
   * @param input Input readable stream
   */
  constructor(input: Readable) {
    super()
    this.attachStream(input)
  }

  /**
   * Attach new input readable stream (current stream will be replaced)
   * @param input Input readable stream
   */
  public attachStream(input: Readable) {
    this.clearBuffer()
    this.end = false
    this.detach()
    this.input = input
      .on('data', this._onData)
      .on('end', this._onEnd)
  }

  /**
   * Detach current input stream
   */
  public detach() {
    this.abort('readable', new StreamDetachedError)
    this.input
      ?.off('data', this._onData)
      .off('end', this._onEnd)
  }

  /**
   * Clear internal buffer
   */
  public clearBuffer() {
    this.bytesToRead = 0
    this.cursor = 0
    this.buffer = Buffer.from('')
  }

  /**
   * Roll internal buffer
   */
  public rollBuffer() {
    this.buffer = this.buffer.slice(this.cursor)
    this.cursor = 0
  }

  protected possiblyNotifyReadable() {
    const { bytesToRead } = this
    if (this.bytesAvailable >= bytesToRead) {
      this.bytesToRead = 0
      this.notify('readable', bytesToRead)
    }
  }

  /**
   * On input data handler
   * @param data Incoming data chunk
   */
  private onData(data: Buffer) {
    this.rollBuffer()
    this.buffer = Buffer.concat([ this.buffer, data ])
    this.possiblyNotifyReadable()
  }

  /**
   * On input stream ends handler
   */
  private onEnd() {
    this.end = true
    this.abort('readable', new InputStreamEndedError)
  }

  /**
   * Unread data
   * 
   * Note that this should only be called synchronously right after a `readNow` call
   * 
   * @param data Data to prepend to the internal buffer
   */
  protected unread(data: Buffer) {
    this.buffer = Buffer.concat([ data, this.buffer.slice(this.cursor) ])
    this.cursor = 0
    // this.possiblyNotifyReadable()  // Should not notify readable in order not to notify readable twice on the same data
  }

  /**
   * The actual `read` method
   * @param size Size of data to read
   */
  protected _read(size: number) {
    const end = this.cursor + size
    const data = this.buffer.slice(this.cursor, end)
    this.cursor = end
    return data
  }

  /**
   * Read whatever available in the internal buffer immediately
   */
  public readNow() {
    return this._read(this.bytesAvailable)
  }

  /**
   * Read data asynchronously
   * @param size Size of data to read in bytes
   */
  public async read(size: number) {
    if (this.pendingRead) throw new ConcurrentReadError
    this.pendingRead = true
    try {
      if(this.bytesAvailable < size) {
        if(this.end) throw new InsufficientBytesError
        this.bytesToRead = size
        try {
          await this.waitFor('readable')
        } catch(err) {
          if(err instanceof InputStreamEndedError) {
            throw new InsufficientBytesError
          }
          throw err
        }
      }
      return this._read(size)
    } finally {
      this.pendingRead = false
    }
  }

  /**
   * Read string of specified length
   * 
   * Note that exactly `length` bytes, including `\0` if any, will be converted into string
   * 
   * @param length String length
   * @param encoding String encoding
   */
  public async readString(length: number, encoding?: BufferEncoding) {
    return (await this.read(length)).toString(encoding)
  }
  
  /**
   * Read `\0`-ended string
   * @param encoding String encoding
   */
  public async readCString(encoding?: BufferEncoding) {
    if (this.pendingRead) throw new ConcurrentReadError
    this.pendingRead = true
    try {
      let buffer = Buffer.alloc(0)
      while (true) {
        buffer = Buffer.concat([ buffer, this.readNow() ])
        const eos = buffer.findIndex(byte => byte == 0)
        if (eos >= 0) {
          // `\0` found
          this.unread(buffer.slice(eos + 1))
          return buffer.toString(encoding, 0, eos)
        } else {
          // Not found
          if (this.end) throw new InsufficientBytesError
          this.bytesToRead = 1
          try {
            await this.waitFor('readable')
          } catch (err) {
            this.unread(buffer)
            throw err
          }
        }
      }
    } finally {
      this.pendingRead = false
    }
  }

  /* Variable length UInt */

  public async readUIntLE(byteLength: number) {
    return (await this.read(byteLength)).readUIntLE(0, byteLength)
  }

  public async readUIntBE(byteLength: number) {
    return (await this.read(byteLength)).readUIntBE(0, byteLength)
  }

  public async *iterUIntLEArray(byteLength: number, size: number) {
    for (const _ of range(size)) {
      yield await this.readUIntLE(byteLength)
    }
  }

  public async *iterUIntBEArray(byteLength: number, size: number) {
    for (const _ of range(size)) {
      yield await this.readUIntBE(byteLength)
    }
  }

  public async readUIntLEArray(byteLength: number, size: number) {
    const res: number[] = []
    for await (const data of this.iterUIntLEArray(byteLength, size)) {
      res.push(data)
    }
    return res
  }

  public async readUIntBEArray(byteLength: number, size: number) {
    const res: number[] = []
    for await (const data of this.iterUIntBEArray(byteLength, size)) {
      res.push(data)
    }
    return res
  }

  /* Variable length Int */

  public async readIntLE(byteLength: number) {
    return (await this.read(byteLength)).readIntLE(0, byteLength)
  }

  public async readIntBE(byteLength: number) {
    return (await this.read(byteLength)).readIntBE(0, byteLength)
  }

  public async *iterIntLEArray(byteLength: number, size: number) {
    for (const _ of range(size)) {
      yield await this.readIntLE(byteLength)
    }
  }

  public async *iterIntBEArray(byteLength: number, size: number) {
    for (const _ of range(size)) {
      yield await this.readIntBE(byteLength)
    }
  }

  public async readIntLEArray(byteLength: number, size: number) {
    const res: number[] = []
    for await (const data of this.iterIntLEArray(byteLength, size)) {
      res.push(data)
    }
    return res
  }

  public async readIntBEArray(byteLength: number, size: number) {
    const res: number[] = []
    for await (const data of this.iterIntBEArray(byteLength, size)) {
      res.push(data)
    }
    return res
  }

  /* UInt8 */

  public async readUInt8() {
    return (await this.read(1)).readUInt8(0)
  }

  public async *iterUInt8Array(size: number) {
    for (const _ of range(size)) {
      yield await this.readUInt8()
    }
  }

  public async readUInt8Array(size: number) {
    const res: number[] = []
    for await (const data of this.iterUInt8Array(size)) {
      res.push(data)
    }
    return res
  }

  /* Int8 */

  public async readInt8() {
    return (await this.read(1)).readInt8(0)
  }

  public async *iterInt8Array(size: number) {
    for (const _ of range(size)) {
      yield await this.readInt8()
    }
  }

  public async readInt8Array(size: number) {
    const res: number[] = []
    for await (const data of this.iterInt8Array(size)) {
      res.push(data)
    }
    return res
  }

  /* UInt16 */

  public async readUInt16LE() {
    return (await this.read(2)).readUInt16LE(0)
  }

  public async readUInt16BE() {
    return (await this.read(2)).readUInt16BE(0)
  }

  public async *iterUInt16LEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readUInt16LE()
    }
  }

  public async *iterUInt16BEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readUInt16BE()
    }
  }

  public async readUInt16LEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterUInt16LEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readUInt16BEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterUInt16BEArray(size)) {
      res.push(data)
    }
    return res
  }

  /* Int16 */

  public async readInt16LE() {
    return (await this.read(2)).readInt16LE(0)
  }

  public async readInt16BE() {
    return (await this.read(2)).readInt16BE(0)
  }

  public async *iterInt16LEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readInt16LE()
    }
  }

  public async *iterInt16BEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readInt16BE()
    }
  }

  public async readInt16LEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterInt16LEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readInt16BEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterInt16BEArray(size)) {
      res.push(data)
    }
    return res
  }

  /* UInt32 */

  public async readUInt32LE() {
    return (await this.read(4)).readUInt32LE(0)
  }

  public async readUInt32BE() {
    return (await this.read(4)).readUInt32BE(0)
  }

  public async *iterUInt32LEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readUInt32LE()
    }
  }

  public async *iterUInt32BEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readUInt32BE()
    }
  }

  public async readUInt32LEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterUInt32LEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readUInt32BEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterUInt32BEArray(size)) {
      res.push(data)
    }
    return res
  }

  /* Int32 */

  public async readInt32LE() {
    return (await this.read(4)).readInt32LE(0)
  }

  public async readInt32BE() {
    return (await this.read(4)).readInt32BE(0)
  }

  public async *iterInt32LEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readInt32LE()
    }
  }

  public async *iterInt32BEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readInt32BE()
    }
  }

  public async readInt32LEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterInt32LEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readInt32BEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterInt32BEArray(size)) {
      res.push(data)
    }
    return res
  }

  /* UInt64 */

  public async readBigUInt64LE() {
    return (await this.read(4)).readBigUInt64LE(0)
  }

  public async readBigUInt64BE() {
    return (await this.read(4)).readBigUInt64BE(0)
  }

  public async *iterBigUInt64LEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readBigUInt64LE()
    }
  }

  public async *iterBigUInt64BEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readBigUInt64BE()
    }
  }

  public async readBigUInt64LEArray(size: number) {
    const res: bigint[] = []
    for await (const data of this.iterBigUInt64LEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readBigUInt64BEArray(size: number) {
    const res: bigint[] = []
    for await (const data of this.iterBigUInt64BEArray(size)) {
      res.push(data)
    }
    return res
  }

  /* Int64 */

  public async readBigInt64LE() {
    return (await this.read(4)).readBigInt64LE(0)
  }

  public async readBigInt64BE() {
    return (await this.read(4)).readBigInt64BE(0)
  }

  public async *iterBigInt64LEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readBigInt64LE()
    }
  }

  public async *iterBigInt64BEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readBigInt64BE()
    }
  }

  public async readBigInt64LEArray(size: number) {
    const res: bigint[] = []
    for await (const data of this.iterBigInt64LEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readBigInt64BEArray(size: number) {
    const res: bigint[] = []
    for await (const data of this.iterBigInt64BEArray(size)) {
      res.push(data)
    }
    return res
  }

  /* Float */

  public async readFloatLE() {
    return (await this.read(4)).readFloatLE(0)
  }

  public async readFloatBE() {
    return (await this.read(4)).readFloatBE(0)
  }

  public async *iterFloatLEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readFloatLE()
    }
  }

  public async *iterFloatBEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readFloatBE()
    }
  }

  public async readFloatLEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterFloatLEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readFloatBEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterFloatBEArray(size)) {
      res.push(data)
    }
    return res
  }

  /* Double */

  public async readDoubleLE() {
    return (await this.read(8)).readDoubleLE(0)
  }

  public async readDoubleBE() {
    return (await this.read(8)).readDoubleBE(0)
  }

  public async *iterDoubleLEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readDoubleLE()
    }
  }

  public async *iterDoubleBEArray(size: number) {
    for (const _ of range(size)) {
      yield await this.readDoubleBE()
    }
  }

  public async readDoubleLEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterDoubleLEArray(size)) {
      res.push(data)
    }
    return res
  }

  public async readDoubleBEArray(size: number) {
    const res: number[] = []
    for await (const data of this.iterDoubleBEArray(size)) {
      res.push(data)
    }
    return res
  }
}

export default AsyncStreamReader

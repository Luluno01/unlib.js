import { Readable } from 'stream'
import EventBarrier from './Sync/EventBarrier'


export class InsufficientBytesError extends Error {
  public name = 'InsufficientBytesError'
}

export class InputStreamEndedError extends Error {
  public name = 'InputStreamEndedError'
}

export class StreamDetachedError extends Error {
  public name = 'StreamDetachedError'
}

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

  /**
   * On input data handler
   * @param data Incoming data chunk
   */
  private onData(data: Buffer) {
    this.buffer = Buffer.concat([ this.buffer, data ])
    const { bytesToRead } = this
    if(this.bytesAvailable >= bytesToRead) {
      this.bytesToRead = 0
      this.notify('readable', bytesToRead)
    }
  }

  /**
   * On input stream ends handler
   */
  private onEnd() {
    this.end = true
    this.abort('readable', new InputStreamEndedError)
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
   * Read data asynchronously
   * @param size Size of data to read in bytes
   */
  public async read(size: number) {
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
  }

  public async readUIntLE(byteLength: number) {
    return (await this.read(byteLength)).readUIntLE(0, byteLength)
  }

  public async readUIntBE(byteLength: number) {
    return (await this.read(byteLength)).readUIntBE(0, byteLength)
  }

  public async readIntLE(byteLength: number) {
    return (await this.read(byteLength)).readIntLE(0, byteLength)
  }

  public async readIntBE(byteLength: number) {
    return (await this.read(byteLength)).readIntBE(0, byteLength)
  }

  public async readUInt8() {
    return (await this.read(1)).readUInt8(0)
  }

  public async readInt8() {
    return (await this.read(1)).readInt8(0)
  }

  public async readUInt16LE() {
    return (await this.read(2)).readUInt16LE(0)
  }

  public async readInt16LE() {
    return (await this.read(2)).readInt16LE(0)
  }

  public async readUInt16BE() {
    return (await this.read(2)).readUInt16BE(0)
  }

  public async readInt16BE() {
    return (await this.read(2)).readInt16BE(0)
  }

  public async readUInt32LE() {
    return (await this.read(4)).readUInt32LE(0)
  }

  public async readInt32LE() {
    return (await this.read(4)).readInt32LE(0)
  }

  public async readUInt32BE() {
    return (await this.read(4)).readUInt32BE(0)
  }

  public async readInt32BE() {
    return (await this.read(4)).readInt32BE(0)
  }

  public async readFloatLE() {
    return (await this.read(4)).readFloatLE(0)
  }

  public async readFloatBE() {
    return (await this.read(4)).readFloatBE(0)
  }

  public async readDoubleLE() {
    return (await this.read(8)).readDoubleLE(0)
  }

  public async readDoubleBE() {
    return (await this.read(8)).readDoubleBE(0)
  }
}

export default AsyncStreamReader

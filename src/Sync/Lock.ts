import { EventBarrier, TimeoutError as TE, AbortionError as AE } from './EventBarrier'
import * as assert from 'assert'
import { sleep } from '../Time/sleep'


export class GeneralError extends Error {
  name = 'GeneralError'
  source = 'Sync.Lock'
  event = 'lock-release'
  id?: any
  cause: Error
  
  constructor(err: Error, id?: any) {
    super(err.message)
    this.cause = err
    if(id != undefined) this.id = id
  }
}

export class TimeoutError extends TE {
  source = 'Sync.Lock'
  id?: any
  constructor(err: TE, id?: any) {
    super(err.message, 'lock-release')
    if(id != undefined) this.id = id
  }
}

export class AbortionError extends AE {
  source = 'Sync.Lock'
  id?: any
  constructor(err: TE, id?: any) {
    super(err.message, 'lock-release')
    if(id != undefined) this.id = id
  }
}

export class TooManyAcquirementsError extends Error {
  name = 'TooManyAcquirementsError'
  event = 'lock-release'
  source = 'Sync.Lock'
  id?: any
  constructor(msg?: string, id?: any) {
    super(msg)
    if(id != undefined) this.id = id
  }
}

/**
 * Lock / Binary semaphore with optional maximum queue size constraint
 * 
 * Note that the underlying scheduler uses a **plain queue** (implemented
 * using `EventBarrier`)
 */
export class Lock extends EventBarrier {
  public maxQueueSize: number
  public get locked() { return this._locked }
  protected _locked = false
  public get queueing() { return this._queueing }
  protected _queueing = 0

  /**
   * 
   * @param maxQueueSize Defaults to `Infinity`. Max queue size for the scheduler
   */
  constructor(maxQueueSize: number = Infinity) {
    super()
    this.maxQueueSize = maxQueueSize
  }

  /**
   * Acquire the lock
   * @param timeout If specified, a `TimeoutError` will be thrown once timeout
   * @param id Operation / Requirement ID (just for debugging)
   */
  public async acquire(timeout?: number, id?: any) {
    if(this._queueing >= this.maxQueueSize) throw new TooManyAcquirementsError(undefined, id)
    this._queueing++
    if(this._locked) {
      try {
        await this.waitFor('lock-release', timeout)
        this._locked = true
      } catch(err /* TimeoutError | AbortionError */) {
        this._queueing--
        if(err instanceof TE) {
          throw new TimeoutError(err, id)
        } else if(err instanceof AE) {
          throw new AbortionError(err, id)
        } else {
          throw new GeneralError(err, id)
        }
      }
    } else this._locked = true
    this._queueing--
  }

  protected doRelease() {
    this._locked = false
    this.notify('lock-release', undefined, 1)
  }

  /**
   * Release the lock
   * @param safeTime Defaults to `0`. The lock will only be actually released
   * after this time (in milliseconds)
   */
  public async release(safeTime: number = 0) {
    assert(this._locked, 'Cannot release twice')
    if(safeTime > 0) await sleep(safeTime)
    this.doRelease()
  }

  /**
   * Abort all pending acquire operations
   * @param err Abortion reason
   */
  public abortAcquire(err?: Error) {
    return this.abort('lock-release', err)
  }
}

export default Lock

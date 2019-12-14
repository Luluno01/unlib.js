import * as assert from 'assert'
import EventBarrier from './EventBarrier'


export class SemaphoreClearedError extends Error {
  public name = 'SemaphoreClearedError'
}

/**
 * Generic semaphore
 */
export class Semaphore extends EventBarrier {
  protected _value: number
  /**
   * Semaphore value
   */
  public get value() {
    return this._value
  }

  /**
   * Constructor of `Semaphore`
   * @param initialValue Initial semaphore value
   */
  constructor(initialValue: number = 0) {
    super()
    this._value = initialValue
  }

  /**
   * Reset semaphore value to `0`
   * @param abort If `true`, a `SemaphoreClearedError` will be thrown for
   * pending `wait`(s), defaults to `false`
   */
  public clear(abort: boolean = false) {
    this._value = 0
    if(abort) this.abort('product', new SemaphoreClearedError)
  }

  /**
   * Wait for some number of products to be available
   */
  public async wait() {
    this._value--
    if(this._value < 0) {
      // Insufficient products
      await this.waitFor('product')
    }
  }

  /**
   * Signal for new product
   */
  public signal() {
    this._value++
    this.notify('product', undefined, 1)
  }
}

/**
 * **One-consumer** counted semaphore
 */
export class CountedSemaphore extends Semaphore {
  /**
   * Wait for some number of products to be available
   * 
   * Note that there should be one pending `wait` at a time, otherwise, all
   * pending `wait`s will not be resolved until the summary of their claims
   * is satisfied; in that case, all pending `wait`s will be resolved
   * **together**
   * @param count Expected number of products, defaults to `1`
   */
  public async wait(count: number = 1) {
    this._value -= count
    if(this._value < 0) {
      // Insufficient products
      await this.waitFor('product')
      assert(this._value >= 0, 'Insufficient products after signaling')
    }
  }

  /**
   * Signal for new products
   * @param count Number of incoming products, defaults to `1`
   */
  public signal(count: number = 1) {
    this._value += count
    if(this._value >= 0) {
      // Now we have sufficient products
      this.notify('product')
    }
  }
}

export default Semaphore

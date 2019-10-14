import { EventEmitter } from 'events'


interface Waiter {
  readonly resolvers: ((value: any) => void)[]
  readonly rejectors: ((err: Error | string | number) => void)[]
  readonly tHandles: ReturnType<typeof setTimeout>[]
}

export class TimeoutError extends Error {
  name = 'TimeoutError'
  source = 'EventBarrier'
}

export class AbortionError extends Error {
  name = 'AbortionError'
  source = 'EventBarrier'
}

/**
 * Event barrier
 * 
 * Note: do not reuse the instance to avoid event leak
 */
export class EventBarrier {
  private waiters: Map<
    /* event */ string,
    /* resolvers and timeout handles */ Waiter
  > = new Map
  private emitter = new EventEmitter

  /**
   * Notify all the waiters of the event
   * @param event Event that just happened
   * @param value Event payload value (as the second argument of
   * `EventEmitter.prototype.emit`)
   */
  notify(event: string, value?: any) {
    this.emitter.emit(event, value)
    return this
  }

  /**
   * Abort waiters that are waiting for an event, causing `waitFor` to reject
   * @param event The event that the waiters are still waiting for
   * @param err Error as rejection reason
   */
  abort(event: string, err?: Error | string | number) {
    const { emitter, waiters } = this
    if(!err) err = new AbortionError
    if(waiters.has(event)) {
      const { resolvers, rejectors, tHandles } = waiters.get(event)!
      rejectors.forEach(rej => rej(err))
      rejectors.splice(0)
      resolvers.splice(0)
      tHandles.forEach(clearTimeout)
      tHandles.splice(0)
      waiters.delete(event)
      emitter.removeAllListeners(event)
    }
    return this
  }

  /**
   * Abort all waiters on all events
   * @param err Error as rejection reason
   */
  abortAll(err?: Error | string | number) {
    this.waiters.forEach((_, key) => this.abort(key, err))
    return this
  }

  /**
   * Wait for specific event to happen
   * @param event Event to wait for
   * @param timeout If specified, a `TimeoutError` will be thrown after that
   * amount of time (in milliseconds)
   */
  waitFor(event: string, timeout?: number) {
    return new Promise<any>((res, rej) => {
      const { resolvers, rejectors, tHandles } = this.getOrCreateWaiter(event)
      const { emitter } = this
      const timeoutError = new TimeoutError
      resolvers.push(res)
      rejectors.push(rej)
      const handler = (value: any) => {
        for(const t of tHandles) clearTimeout(t)
        tHandles.splice(0)
        for(const resolve of resolvers) resolve(value)
        resolvers.splice(0)
        rejectors.splice(0)
        this.waiters.delete(event)
        emitter.removeAllListeners(event)
      }
      if(emitter.listeners(event).length == 0) emitter.on(event, handler)
      if(timeout != undefined) {
        const t = setTimeout(() => {
          tHandles.splice(tHandles.indexOf(t), 1)
          resolvers.splice(resolvers.indexOf(res), 1)  // Do not resolve since already timeout
          rejectors.splice(rejectors.indexOf(rej), 1)
          if(resolvers.length == 0) {
            this.waiters.delete(event)
            emitter.removeAllListeners(event)
          }
          rej(timeoutError)
        }, timeout)
        tHandles.push(t)
      }
    })
  }

  private getOrCreateWaiter(event: string) {
    const { waiters } = this
    if(waiters.has(event)) {
      return waiters.get(event)
    } else {
      const waiter: Waiter = {
        resolvers: [],
        rejectors: [],
        tHandles: []
      }
      waiters.set(event, waiter)
      return waiter
    }
  }
}

export default EventBarrier

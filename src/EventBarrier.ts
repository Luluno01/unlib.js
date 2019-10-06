import { EventEmitter } from 'events'


interface Waiter {
  resolvers: ((value: any) => void)[],
  tHandles: ReturnType<typeof setTimeout>[]
}

export class TimeoutError extends Error {
  name = 'TimeoutError'
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
  }

  /**
   * Wait for specific event to happen
   * @param event Event to wait for
   * @param timeout If specified, a `TimeoutError` will be thrown after that
   * amount of time (in milliseconds)
   */
  waitFor(event: string, timeout?: number) {
    return new Promise<any>((res, rej) => {
      const { resolvers, tHandles } = this.getOrCreateWaiter(event)
      const { emitter } = this
      const timeoutError = new TimeoutError
      resolvers.push(res)
      const handler = (value: any) => {
        for(const t of tHandles) clearTimeout(t)
        tHandles.splice(0)
        for(const resolve of resolvers) resolve(value)
        resolvers.splice(0)
      }
      if(emitter.listeners(event).length == 0) emitter.on(event, handler)
      if(timeout != undefined) {
        const t = setTimeout(() => {
          tHandles.splice(tHandles.indexOf(t), 1)
          resolvers.splice(resolvers.indexOf(res), 1)  // Do not resolve since already timeout
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
        tHandles: []
      }
      waiters.set(event, waiter)
      return waiter
    }
  }
}

export default EventBarrier

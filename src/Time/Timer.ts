export class Timer {
  interval: number
  private int: any
  startTime: number
  pauseTime: number
  duration: number
  callback: (time?: Date, ...args: any[]) => any
  private _callback = () => {
    if(this.duration && Date.now() - this.startTime > this.duration) {
      this.duration = -1
      if(this._onStop) {
        this._onStop(new Date())
      }
      clearInterval(this.int)
      this.int = null
      return
    }
    this.callback(new Date())
  }
  private _onStop: ((time: Date) => void)

  /**
   * @description Constructor of `Timer`.
   * @param callback Callback function.
   * @param interval Timer interval.
   * @param maxDuration Max timer running time in milliseconds. Timer stops when max duration exceeded. 0 or undefined leads to an infinite timer.
   */
  constructor(callback: (time?: Date, ...args: any[]) => any, interval: number, maxDuration?: number) {
    if(interval < 0) {
      throw new RangeError('Invalid interval. Expected a non-negative number')
    }
    this.interval = interval
    this.duration = maxDuration || 0
    this.startTime = -1
    this.pauseTime = -1
    this.int = null
    this.callback = callback
    return this
  }

  /**
   * @description Start the timer.
   * @returns {Timer} This object.
   */
  start(): Timer {
    if(this.int) return this  // Already started
    this.startTime = Date.now()
    this.pauseTime = -1
    this.int = setInterval(this._callback, this.interval)
    return this
  }

  /**
   * @description Pause the timer.
   * @returns {Timer} this object.
   */
  pause(): Timer {
    if(!this.int) return
    clearInterval(this.int)
    this.int = null
    this.pauseTime = Date.now()
    this.duration = this.startTime + this.duration - this.pauseTime  // Remaining time
    return this
  }

  /**
   * @description Get `onStop` handler.
   * @returns {(time: Date) => void} A handler function will be called when the timer stops.
   */
  get onStop(): (time: Date) => void {
    return this._onStop
  }

  /**
   * @description Stop the timer.
   * @returns {number} The remaining duration in milliseconds.
   */
  stop(): number {
    if(!this.int) return
    clearInterval(this.int)
    this.int = null
    if(this.pauseTime > 0) {  // Pause -> stop
      this.duration = this.pauseTime - this.startTime
    } else {
      this.duration = this.duration - (Date.now() - this.startTime)
    }
    this.pauseTime = -1
    this.startTime = -1
    if(this._onStop) {
      this._onStop((new Date()))
    }
    return this.duration  // Remaining time
  }

  /**
   * @description Attach handlers to the timer for specific event.
   * @param event The event to listen to.
   * @param callback The handler function for the event `event`.
   */
  on(event: 'stop', callback: (time: Date) => void): Timer
  on(event: string, callback: (time?: Date, ...args: any) => any): Timer {
    switch(event) {
      case 'stop': {
        this._onStop = callback
        break
      }
      default: return this
    }
    return this
  }
}

export default Timer

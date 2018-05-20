declare class Timer {
  readonly interval: number
  readonly startTime: number
  readonly pauseTime: number
  readonly duration: number
  callback: (time?: Date, ...args: any[]) => any

  /**
   * @description Constructor of `Timer`.
   * @param callback Callback function.
   * @param interval Timer interval.
   * @param maxDuration Max timer running time in milliseconds. Timer stops when max duration exceeded. 0 or undefined leads to an infinite timer.
   */
  constructor(callback: (time?: Date, ...args: any[]) => any, interval: number, maxDuration?: number)

  /**
   * @description Start the timer.
   * @returns {Timer} This object.
   */
  start(): Timer

  /**
   * @description Pause the timer.
   * @returns {Timer} this object.
   */
  pause(): Timer

  /**
   * @description Get `onStop` handler.
   */
  readonly onStop: (time?: Date, ...args) => any | null

  /**
   * @description Stop the timer.
   * @returns {number} The remaining duration in milliseconds.
   */
  stop(): number

  /**
   * @description Attach handlers to the timer for specific event.
   * @param event The event to listen to.
   * @param callback The handler function for the event `event`.
   */
  on(event: string, callback: (time?: Date, ...args) => any): Timer
}
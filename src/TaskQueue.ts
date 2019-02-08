import * as assert from 'assert'


export type Task<T> = () => Promise<T>

/**
 * @description A static task queue which has a max number of concurrent pending task limit.
 * Note that this is a static task queue, once the tasks are determined, you can't push a new task or abort a pending task.
 * 
 * There are 3 states of a task:
 * 
 * 1. Queueing. The task is not yet started and is waiting in the task queue.
 * 2. Pending. The task is started and has not finished yet.
 * 3. Finished. The task has finished. A finished task may be either resolved or rejected.
 * 
 * Usage:
 * 
 * ```
 * let job = new TaskQueue(someTasks)
 * let results = await job.start()
 * // Check `job.errs` for rejected tasks
 * ```
 * 
 * Each resolved result of the tasks are stored in the resolved array `results` with the same index of its corresponding task.
 * 
 * If a task are rejected, the reason will be stored in the object `job.errs` with the same index of its corresponding task, and the corresponding position at `results` will be falsy.
 */
export class TaskQueue<T> {

  private _queueing: Task<T>[]
  /**
   * The number of queueing tasks.
   */
  get queueing(): number {
    return this._queueing.length - this._pendingNum - this._finished
  }
  /**
   * A copy of queueing tasks.
   */
  get queue(): Task<T>[] {
    return this._queueing.slice(this.ptr)
  }

  private ptr: number = 0

  private _pending: { task: Promise<T>, id: number }[]
  private _pendingNum: number = 0
  /**
   * The number of pending tasks.
   */
  get pending(): number {
    return this._pendingNum
  }

  private results: T[]
  /**
   * Rejection reasons indexed by the indexes of their corresponding tasks.
   */
  errs: { [index: number]: (Error | string) } = {}
  private _finished: number = 0
  /**
   * The number of finished tasks.
   */
  get finished(): number {
    return this._finished
  }

  /**
   * Max number of concurrent pending tasks of this TaskQueue.
   */
  readonly maxConcurrency: number

  private resolve: (value?: {} | PromiseLike<{}>) => void

  constructor(tasks: Task<T>[], maxConcurrency: number = 5) {
    this._queueing = tasks
    assert(maxConcurrency > 0)
    maxConcurrency = Math.min(tasks.length, maxConcurrency)
    this.maxConcurrency = maxConcurrency
    this._pending = new Array(maxConcurrency)
    this.results = new Array(tasks.length)
  }

  /**
   * @description Start the queue.
   */
  start(): Promise<T[]> {
    for(let i = this.ptr; i < Math.min(this._queueing.length, this.maxConcurrency) + 1; i++) {
      process.nextTick(() => TaskQueue.nextTask(this))
    }
    return new Promise(resolve => this.resolve = resolve)
  }

  private static nextTask<T>(queue: TaskQueue<T>) {
    const taskIndex = queue.ptr
    const task = queue._queueing[queue.ptr]
    if(task) {
      queue.ptr++
      let pendingIndex = 0
      for(let pendingTask of queue._pending) {
        if(!pendingTask) {  // An empty position found
          const p = task()  // Start a new task
          queue._pending[pendingIndex] = { task: p, id: taskIndex }  // Put it into pending list
          queue._pendingNum++
          p.then(result => {
            queue.results[taskIndex] = result
          }).catch(err => {
            queue.errs[taskIndex] = err
          }).finally(() => {
            queue._pending[pendingIndex] = null  // Remove from pending list
            queue._pendingNum--
            queue._finished++
            TaskQueue.nextTask(queue)
          })
          break
        }
        pendingIndex++
      }
    }
    if(queue._finished == queue._queueing.length) {  // All tasks finished
      queue.resolve(queue.results)
    }
  }
}

export default TaskQueue
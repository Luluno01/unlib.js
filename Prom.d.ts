declare namespace Prom {
  /**
   * @description Promisify an asynchronous function in a way differed from `util.promisify`.
   * @param func An asynchronous function whose last parameter is a callback typed (err: ErrorType, ...args) => any.
   * @returns {(...args: any[]) => Promise<any[]>} Promisified function. Will resolve all the arguments in the form of an array.
   */
  export function promisify(func: Function): (...args: any[]) => Promise<any[]>
  
  /**
   * @description Promisify all (or some of) the functions in `obj`.
   * @param obj Object to promisify.
   * @param candidates Optional. Names of canditate properties. Defaults to `Object.keys(obj)`.
   * @param promisify Optional. Promisify function should be used. Defaults to `Prom.promisify`.
   * @returns {Object} Promisified object.
   */
  export function promisifyAll(obj: Object, candidates?: string[], promisify?: (func: Function) => (...args: any[]) => Promise<any>): Object
}
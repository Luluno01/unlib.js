import * as util from 'util'

export namespace Prom {
  /**
   * @description Promisify an asynchronous function in a way differed from `util.promisify`.
   * @param func An asynchronous function whose last parameter is a callback typed (err: ErrorType, ...args) => any.
   * @returns {(...args: any[]) => Promise<any[]>} Promisified function. Will resolve all the arguments in the form of an array.
   */
  export function promisify(func: Function): (...args: any[]) => Promise<any[]> {
    return func[util.promisify.custom] || ((...args: any[]) => {
      return new Promise((resolve, reject) => {
        func(...args, (err: NodeJS.ErrnoException, ...callbackArgs: any[]) => {
          if(err) {
            reject(err)
          } else {
            resolve(callbackArgs)  // Pass all the arguments instead of just the first argument
          }
        })
      })
    })
  }

  /**
   * @description Promisify all (or some of) the functions in `obj`.
   * @param obj Object to promisify.
   * @param candidates Optional. Names of canditate properties. Defaults to `Object.keys(obj)`.
   * @param promisify Optional. Promisify function should be used. Defaults to `Prom.promisify`.
   * @returns {Object} Promisified object.
   */
  export function promisifyAll(obj: Object, candidates=Object.keys(obj), promisify: (func: Function) => (...args: any[]) => Promise<any> = Prom.promisify): Object {
    let res = {}
    for(let property of candidates) {
      res[property] = (typeof obj[property] == 'function' && !property.endsWith('Sync')) ? promisify(obj[property]) : obj[property]
    }
    return res
  }
}
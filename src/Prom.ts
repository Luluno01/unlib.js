import * as util from 'util'

namespace Prom {
  /**
   * Hell yeah
   */
  export interface CustomPromisify<TCustom extends Function> extends Function {
    __promisify__: TCustom;
  }
  export type Promisifiable = (...args: any[]) => void
  export type Promisifiable05<TResult1, TResult2, TResult3, TResult4, TResult5> = (callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4, result5: TResult5) => void) => void
  export type Promisifiable04<TResult1, TResult2, TResult3, TResult4> = (callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4) => void) => void
  export type Promisifiable03<TResult1, TResult2, TResult3> = (callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3) => void) => void
  export type Promisifiable02<TResult1, TResult2> = (callback: (err: Error | null, result1: TResult1, result2: TResult2) => void) => void
  export type Promisifiable01<TResult1> = (callback: (err: Error | null, result1: TResult1) => void) => void
  export type Promisifiable00 = (callback: (err: Error | null) => void) => void
  export type Promisifiable15<T1, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4, result5: TResult5) => void) => void
  export type Promisifiable14<T1, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4) => void) => void
  export type Promisifiable13<T1, TResult1, TResult2, TResult3> = (arg1: T1, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3) => void) => void
  export type Promisifiable12<T1, TResult1, TResult2> = (arg1: T1, callback: (err: Error | null, result1: TResult1, result2: TResult2) => void) => void
  export type Promisifiable11<T1, TResult1> = (arg1: T1, callback: (err: Error | null, result1: TResult1) => void) => void
  export type Promisifiable10<T1> = (arg1: T1, callback: (err: Error | null) => void) => void
  export type Promisifiable25<T1, T2, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4, result5: TResult5) => void) => void
  export type Promisifiable24<T1, T2, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4) => void) => void
  export type Promisifiable23<T1, T2, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3) => void) => void
  export type Promisifiable22<T1, T2, TResult1, TResult2> = (arg1: T1, arg2: T2, callback: (err: Error | null, result1: TResult1, result2: TResult2) => void) => void
  export type Promisifiable21<T1, T2, TResult1> = (arg1: T1, arg2: T2, callback: (err: Error | null, result1: TResult1) => void) => void
  export type Promisifiable20<T1, T2> = (arg1: T1, arg2: T2, callback: (err: Error | null) => void) => void
  export type Promisifiable35<T1, T2, T3, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4, result5: TResult5) => void) => void
  export type Promisifiable34<T1, T2, T3, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4) => void) => void
  export type Promisifiable33<T1, T2, T3, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3) => void) => void
  export type Promisifiable32<T1, T2, T3, TResult1, TResult2> = (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error | null, result1: TResult1, result2: TResult2) => void) => void
  export type Promisifiable31<T1, T2, T3, TResult1> = (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error | null, result1: TResult1) => void) => void
  export type Promisifiable30<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error | null) => void) => void
  export type Promisifiable45<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4, result5: TResult5) => void) => void
  export type Promisifiable44<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4) => void) => void
  export type Promisifiable43<T1, T2, T3, T4, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3) => void) => void
  export type Promisifiable42<T1, T2, T3, T4, TResult1, TResult2> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error | null, result1: TResult1, result2: TResult2) => void) => void
  export type Promisifiable41<T1, T2, T3, T4, TResult1> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error | null, result1: TResult1) => void) => void
  export type Promisifiable40<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error | null) => void) => void
  export type Promisifiable55<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4, result5: TResult5) => void) => void
  export type Promisifiable54<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3, result4: TResult4) => void) => void
  export type Promisifiable53<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error | null, result1: TResult1, result2: TResult2, result3: TResult3) => void) => void
  export type Promisifiable52<T1, T2, T3, T4, T5, TResult1, TResult2> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error | null, result1: TResult1, result2: TResult2) => void) => void
  export type Promisifiable51<T1, T2, T3, T4, T5, TResult1> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error | null, result1: TResult1) => void) => void
  export type Promisifiable50<T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error | null) => void) => void

  export type Promisified = (...args: any[]) => Promise<any[]>
  export type Promisified05<TResult1, TResult2, TResult3, TResult4, TResult5> = () => Promise<[TResult1, TResult2, TResult3, TResult4, TResult5]>
  export type Promisified04<TResult1, TResult2, TResult3, TResult4> = () => Promise<[TResult1, TResult2, TResult3, TResult4]>
  export type Promisified03<TResult1, TResult2, TResult3> = () => Promise<[TResult1, TResult2, TResult3]>
  export type Promisified02<TResult1, TResult2> = () => Promise<[TResult1, TResult2]>
  export type Promisified01<TResult1> = () => Promise<[TResult1]>
  export type Promisified00 = () => Promise<[void]>
  export type Promisified15<T1, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1) => Promise<[TResult1, TResult2, TResult3, TResult4, TResult5]>
  export type Promisified14<T1, TResult1, TResult2, TResult3, TResult4> = (arg1: T1) => Promise<[TResult1, TResult2, TResult3, TResult4]>
  export type Promisified13<T1, TResult1, TResult2, TResult3> = (arg1: T1) => Promise<[TResult1, TResult2, TResult3]>
  export type Promisified12<T1, TResult1, TResult2> = (arg1: T1) => Promise<[TResult1, TResult2]>
  export type Promisified11<T1, TResult1> = (arg1: T1) => Promise<[TResult1]>
  export type Promisified10<T1> = (arg1: T1) => Promise<[void]>
  export type Promisified25<T1, T2, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2) => Promise<[TResult1, TResult2, TResult3, TResult4, TResult5]>
  export type Promisified24<T1, T2, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2) => Promise<[TResult1, TResult2, TResult3, TResult4]>
  export type Promisified23<T1, T2, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2) => Promise<[TResult1, TResult2, TResult3]>
  export type Promisified22<T1, T2, TResult1, TResult2> = (arg1: T1, arg2: T2) => Promise<[TResult1, TResult2]>
  export type Promisified21<T1, T2, TResult1> = (arg1: T1, arg2: T2) => Promise<[TResult1]>
  export type Promisified20<T1, T2> = (arg1: T1, arg2: T2) => Promise<[void]>
  export type Promisified35<T1, T2, T3, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2, arg3: T3) => Promise<[TResult1, TResult2, TResult3, TResult4, TResult5]>
  export type Promisified34<T1, T2, T3, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2, arg3: T3) => Promise<[TResult1, TResult2, TResult3, TResult4]>
  export type Promisified33<T1, T2, T3, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2, arg3: T3) => Promise<[TResult1, TResult2, TResult3]>
  export type Promisified32<T1, T2, T3, TResult1, TResult2> = (arg1: T1, arg2: T2, arg3: T3) => Promise<[TResult1, TResult2]>
  export type Promisified31<T1, T2, T3, TResult1> = (arg1: T1, arg2: T2, arg3: T3) => Promise<[TResult1]>
  export type Promisified30<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => Promise<[void]>
  export type Promisified45<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<[TResult1, TResult2, TResult3, TResult4, TResult5]>
  export type Promisified44<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<[TResult1, TResult2, TResult3, TResult4]>
  export type Promisified43<T1, T2, T3, T4, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<[TResult1, TResult2, TResult3]>
  export type Promisified42<T1, T2, T3, T4, TResult1, TResult2> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<[TResult1, TResult2]>
  export type Promisified41<T1, T2, T3, T4, TResult1> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<[TResult1]>
  export type Promisified40<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<[void]>
  export type Promisified55<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4, TResult5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<[TResult1, TResult2, TResult3, TResult4, TResult5]>
  export type Promisified54<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<[TResult1, TResult2, TResult3, TResult4]>
  export type Promisified53<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<[TResult1, TResult2, TResult3]>
  export type Promisified52<T1, T2, T3, T4, T5, TResult1, TResult2> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<[TResult1, TResult2]>
  export type Promisified51<T1, T2, T3, T4, T5, TResult1> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<[TResult1]>
  export type Promisified50<T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<[void]>

  export function promisify<TCustom extends Function>(fn: CustomPromisify<TCustom>): TCustom
  export function promisify<TResult1, TResult2, TResult3, TResult4, TResult5>(fn: Promisifiable05<TResult1, TResult2, TResult3, TResult4, TResult5>): Promisified05<TResult1, TResult2, TResult3, TResult4, TResult5>
  export function promisify<TResult1, TResult2, TResult3, TResult4>(fn: Promisifiable04<TResult1, TResult2, TResult3, TResult4>): Promisified04<TResult1, TResult2, TResult3, TResult4>
  export function promisify<TResult1, TResult2, TResult3>(fn: Promisifiable03<TResult1, TResult2, TResult3>): Promisified03<TResult1, TResult2, TResult3>
  export function promisify<TResult1, TResult2>(fn: Promisifiable02<TResult1, TResult2>): Promisified02<TResult1, TResult2>
  export function promisify<TResult1>(fn: Promisifiable01<TResult1>): Promisified01<TResult1>
  export function promisify(fn: Promisifiable00): Promisified00
  export function promisify<T1, TResult1, TResult2, TResult3, TResult4, TResult5>(fn: Promisifiable15<T1, TResult1, TResult2, TResult3, TResult4, TResult5>): Promisified15<T1, TResult1, TResult2, TResult3, TResult4, TResult5>
  export function promisify<T1, TResult1, TResult2, TResult3, TResult4>(fn: Promisifiable14<T1, TResult1, TResult2, TResult3, TResult4>): Promisified14<T1, TResult1, TResult2, TResult3, TResult4>
  export function promisify<T1, TResult1, TResult2, TResult3>(fn: Promisifiable13<T1, TResult1, TResult2, TResult3>): Promisified13<T1, TResult1, TResult2, TResult3>
  export function promisify<T1, TResult1, TResult2>(fn: Promisifiable12<T1, TResult1, TResult2>): Promisified12<T1, TResult1, TResult2>
  export function promisify<T1, TResult1>(fn: Promisifiable11<T1, TResult1>): Promisified11<T1, TResult1>
  export function promisify<T1>(fn: Promisifiable10<T1>): Promisified10<T1>
  export function promisify<T1, T2, TResult1, TResult2, TResult3, TResult4, TResult5>(fn: Promisifiable25<T1, T2, TResult1, TResult2, TResult3, TResult4, TResult5>): Promisified25<T1, T2, TResult1, TResult2, TResult3, TResult4, TResult5>
  export function promisify<T1, T2, TResult1, TResult2, TResult3, TResult4>(fn: Promisifiable24<T1, T2, TResult1, TResult2, TResult3, TResult4>): Promisified24<T1, T2, TResult1, TResult2, TResult3, TResult4>
  export function promisify<T1, T2, TResult1, TResult2, TResult3>(fn: Promisifiable23<T1, T2, TResult1, TResult2, TResult3>): Promisified23<T1, T2, TResult1, TResult2, TResult3>
  export function promisify<T1, T2, TResult1, TResult2>(fn: Promisifiable22<T1, T2, TResult1, TResult2>): Promisified22<T1, T2, TResult1, TResult2>
  export function promisify<T1, T2, TResult1>(fn: Promisifiable21<T1, T2, TResult1>): Promisified21<T1, T2, TResult1>
  export function promisify<T1, T2>(fn: Promisifiable20<T1, T2>): Promisified20<T1, T2>
  export function promisify<T1, T2, T3, TResult1, TResult2, TResult3, TResult4, TResult5>(fn: Promisifiable35<T1, T2, T3, TResult1, TResult2, TResult3, TResult4, TResult5>): Promisified35<T1, T2, T3, TResult1, TResult2, TResult3, TResult4, TResult5>
  export function promisify<T1, T2, T3, TResult1, TResult2, TResult3, TResult4>(fn: Promisifiable34<T1, T2, T3, TResult1, TResult2, TResult3, TResult4>): Promisified34<T1, T2, T3, TResult1, TResult2, TResult3, TResult4>
  export function promisify<T1, T2, T3, TResult1, TResult2, TResult3>(fn: Promisifiable33<T1, T2, T3, TResult1, TResult2, TResult3>): Promisified33<T1, T2, T3, TResult1, TResult2, TResult3>
  export function promisify<T1, T2, T3, TResult1, TResult2>(fn: Promisifiable32<T1, T2, T3, TResult1, TResult2>): Promisified32<T1, T2, T3, TResult1, TResult2>
  export function promisify<T1, T2, T3, TResult1>(fn: Promisifiable31<T1, T2, T3, TResult1>): Promisified31<T1, T2, T3, TResult1>
  export function promisify<T1, T2, T3>(fn: Promisifiable30<T1, T2, T3>): Promisified30<T1, T2, T3>
  export function promisify<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4, TResult5>(fn: Promisifiable45<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4, TResult5>): Promisified45<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4, TResult5>
  export function promisify<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4>(fn: Promisifiable44<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4>): Promisified44<T1, T2, T3, T4, TResult1, TResult2, TResult3, TResult4>
  export function promisify<T1, T2, T3, T4, TResult1, TResult2, TResult3>(fn: Promisifiable43<T1, T2, T3, T4, TResult1, TResult2, TResult3>): Promisified43<T1, T2, T3, T4, TResult1, TResult2, TResult3>
  export function promisify<T1, T2, T3, T4, TResult1, TResult2>(fn: Promisifiable42<T1, T2, T3, T4, TResult1, TResult2>): Promisified42<T1, T2, T3, T4, TResult1, TResult2>
  export function promisify<T1, T2, T3, T4, TResult1>(fn: Promisifiable41<T1, T2, T3, T4, TResult1>): Promisified41<T1, T2, T3, T4, TResult1>
  export function promisify<T1, T2, T3, T4>(fn: Promisifiable40<T1, T2, T3, T4>): Promisified40<T1, T2, T3, T4>
  export function promisify<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4, TResult5>(fn: Promisifiable55<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4, TResult5>): Promisified55<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4, TResult5>
  export function promisify<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4>(fn: Promisifiable54<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4>): Promisified54<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3, TResult4>
  export function promisify<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3>(fn: Promisifiable53<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3>): Promisified53<T1, T2, T3, T4, T5, TResult1, TResult2, TResult3>
  export function promisify<T1, T2, T3, T4, T5, TResult1, TResult2>(fn: Promisifiable52<T1, T2, T3, T4, T5, TResult1, TResult2>): Promisified52<T1, T2, T3, T4, T5, TResult1, TResult2>
  export function promisify<T1, T2, T3, T4, T5, TResult1>(fn: Promisifiable51<T1, T2, T3, T4, T5, TResult1>): Promisified51<T1, T2, T3, T4, T5, TResult1>
  export function promisify<T1, T2, T3, T4, T5>(fn: Promisifiable50<T1, T2, T3, T4, T5>): Promisified50<T1, T2, T3, T4, T5>
  export function promisify(fn: Promisifiable): Promisified  // Fallback
  export function promisify(fn: Function): Function  // Fallback

  /**
   * @description Promisify an asynchronous function in a way differed from `util.promisify`.
   * @param func An asynchronous function whose last parameter is a callback typed (err: ErrorType, ...args) => any.
   * @returns {(...args: any[]) => Promise<any[]>} Promisified function. Will resolve all the arguments in the form of an array.
   */
  export function promisify(func: Function): (...args: any[]) => Promise<any[]> {
    return func[util.promisify.custom] || ((...args: any[]) => {
      return new Promise((resolve, reject) => {
        func(...args, (err: (Error | null), ...callbackArgs: any[]) => {
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
  export function promisifyAll<T extends Object>(obj: T, candidates=Object.keys(obj), promisify: (func: Function) => (...args: any[]) => Promise<any> = Prom.promisify): Object {
    let res = {}
    for(let property of candidates) {
      res[property] = (typeof obj[property] == 'function' && !property.endsWith('Sync')) ? promisify(obj[property]) : obj[property]
    }
    return res
  }
}

export default Prom

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in Prom) module.exports[key] = Prom[key]
} catch {
}
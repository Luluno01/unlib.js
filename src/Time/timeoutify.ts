export class TimeoutError extends Error {
  name = 'TimeoutError'
  source = 'timeoutify'
}


export function timeoutify<U>(func: () => Promise<U>, t: number): typeof func
export function timeoutify<T1, U>(func: (arg1: T1) => Promise<U>, t: number): typeof func
export function timeoutify<T1, T2, U>(func: (arg1: T1, arg2: T2) => Promise<U>, t: number): typeof func
export function timeoutify<T1, T2, T3, U>(func: (arg1: T1, arg2: T2, arg3: T3) => Promise<U>, t: number): typeof func
export function timeoutify<T1, T2, T3, T4, U>(func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<U>, t: number): typeof func
export function timeoutify<T1, T2, T3, T4, T5, U>(func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<U>, t: number): typeof func
export function timeoutify<T>(func: (...args: any) => Promise<T>, t: number) {
  return function timeoutified() {
    const err = new TimeoutError
    return new Promise<T>(async (res, rej) => {
      let timeoutHandle = setTimeout(() => {
        const _rej = rej
        res = rej = null
        _rej(err)
      }, t);
      (func.apply(this, arguments) as Promise<T>)
        .then(val => {
          if(res) res(val)
        })
        .catch(reason => {
          if(rej) rej(reason)
        })
        .finally(() => {
          if(timeoutHandle) {
            clearTimeout(timeoutHandle)
            timeoutHandle = null
          }
        })
    })
  }
}

export default timeoutify

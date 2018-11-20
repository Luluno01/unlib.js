import G from './Generators'
import O from './Obj'
import * as assert from 'assert'


export interface EnhancedMath extends Math {
  fac(num: number): number
  per(total: number, num: number): number
  com(total: number, num: number): number
  sum(values: number[]): number
  mean(values: number[]): number
  variance(values: number[], isSample?: boolean): number
  patch(): void
}

namespace EnhancedMath {
  /**
   * @description Return `num!`.
   * @param num A non-negative integer.
   */
  export function fac(num: number): number {
    num = Math.floor(num)
    assert(num >= 0)
    let res: number = 1
    for(let i of G.range(1, num + 1)) res *= i
    return res
  }

  /**
   * @description Return `num`-permutations of `total`.
   * @param total A non-negative integer.
   * @param num A non-negative integer.
   */
  export function per(total: number, num: number): number {
    num = Math.floor(num)
    total = Math.floor(total)
    assert(num >= 0 && total >= num)
    return fac(total) / fac(total - num)
  }

  /**
   * @description Return `num`-combinations of `total`.
   * @param total A non-negative integer.
   * @param num A non-negative integer.
   */
  export function com(total: number, num: number): number {
    num = Math.floor(num)
    total = Math.floor(total)
    assert(num >= 0 && total >= num)
    return per(total, num) / fac(num)
  }

  /**
   * @description Patch built-in `Math` object wich `EnhancedMath`.
   */
  export function patch(): void {
    O.append(Math, EnhancedMath)
  }

  /**
   * @description Get sum of `values`.
   * @param values Values.
   */
  export function sum(values: number[]): number {
    return values.reduce((a, b) => a + b)
  }

  /**
   * @description Get the average of `values`.
   * @param values Values.
   */
  export function mean(values: number[]): number {
    return sum(values) / values.length
  }

  /**
   * @description Get the variance of `values`.
   * @param values Values.
   * @param isSample Whether the values are samples.
   */
  export function variance(values: number[], isSample: boolean = true): number {
    let avg = mean(values)
    return values.reduce((previous, current) => previous + (current - avg) ** 2) / (values.length - (isSample as any))
  }
}
O.appendOwnProperties(EnhancedMath, Math)

export default EnhancedMath as EnhancedMath

declare var module: any
try {
for(var key in EnhancedMath) module.exports[key] = EnhancedMath[key]
} catch {
}
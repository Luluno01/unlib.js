import { range } from './Generators'
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

// Copied from lib.es2015.core.d.ts
export const clz32: (x: number) => number = Math.clz32
export const imul: (x: number, y: number) => number = Math.imul
export const sign: (x: number) => number = Math.sign
export const log10: (x: number) => number = Math.log10
export const log2: (x: number) => number = Math.log2
export const log1p: (x: number) => number = Math.log1p
export const expm1: (x: number) => number = Math.expm1
export const cosh: (x: number) => number = Math.cosh
export const sinh: (x: number) => number = Math.sinh
export const tanh: (x: number) => number = Math.tanh
export const acosh: (x: number) => number = Math.acosh
export const asinh: (x: number) => number = Math.asinh
export const atanh: (x: number) => number = Math.atanh
export const hypot: (...values: number[]) => number = Math.hypot
export const trunc: (x: number) => number = Math.trunc
export const fround: (x: number) => number = Math.fround
export const cbrt: (x: number) => number = Math.cbrt

/**
 * @description Return `num!`.
 * @param num A non-negative integer.
 */
export function fac(num: number): number {
  num = Math.floor(num)
  assert(num >= 0)
  let res: number = 1
  for(let i of range(1, num + 1)) res *= i
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

/**
 * @description Patch built-in `Math` object wich `EnhancedMath`.
 */
export function patch(): void {
  const patchList = {
    fac,
    per,
    com,
    sum,
    mean,
    variance
  }
  O.append(Math, patchList)
}
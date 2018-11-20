import { EnhancedMath } from './src/Math'

/**
 * Once you've called `unlib.Math.patch`, you are able to use functions from `EnhancedMath`.
 */
declare global {
  interface Math {
    fac(num: number): number
    per(total: number, num: number): number
    com(total: number, num: number): number
    sum(values: number[]): number
    mean(values: number[]): number
    variance(values: number[], isSample?: boolean): number
  }
}
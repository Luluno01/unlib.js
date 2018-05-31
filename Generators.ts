import { Random } from './Random'

export namespace Generators {
  /**
   * @description A generator that generates a sequence ranged [`a`, `b`) at a pace of `step` per step.
   * @param a The lower bound.
   * @param b Optional. The upper bound. If not set, the range would be [0, `a`).
   * @param step Optional. Defaults to 1. Step.
   */
  export function *range(a: number, b?: number, step: number = 1) {
    if(b == undefined) {
      [a, b] = [0, a]
    }
    for(let i = a; i < b; i += step) {
      yield i
    }
  }

  /**
   * @description A generator that generates a characters sequence ranged [`a`, `b`] at a pace of `step` per step.
   * @param a The lower bound.
   * @param b The upper bound.
   * @param step Optional. Defaults to 1. Step.
   */
  export function *charRange(a: string, b: string, step: number = 1) {
    let _a = a.charCodeAt(0)
    let _b = b.charCodeAt(0)
    for(let i = _a; i <= _b; i += step) {
      yield String.fromCharCode(i)
    }
  }

  /**
   * @description Combine all the generators passed as parameters into a new generator.
   * @param ranges Range generators to combine together.
   */
  export function *newRange(...ranges: Array<IterableIterator<number | string>>) {
    for(let range of ranges) yield* range
  }

  /**
   * @description A generator that generates a random sequence whose items are chosen from `arr`.
   * @param arr An array of candidates or a generator.
   * @param length The length of generated sequence.
   */
  export function *randSeq(arr: any, length: number) {
    if(arr.next && arr[Symbol.iterator]) arr = Array.from(arr)  // [...arr]
    for(let i = 0; i < length; i++) {
      yield arr[Random.randint(arr.length)]
    }
  }
}

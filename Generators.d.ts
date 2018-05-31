declare namespace Random {
  /**
   * @description A generator that generates a sequence ranged [`a`, `b`) at a pace of `step` per step.
   * @param a The lower bound.
   * @param b Optional. The upper bound. If not set, the range would be [0, `a`).
   * @param step Optional. Defaults to 1. Step.
   */
  export function range(a: number, b?: number, step?: number): IterableIterator<number>

  /**
   * @description A generator that generates a characters sequence ranged [`a`, `b`] at a pace of `step` per step.
   * @param a The lower bound.
   * @param b The upper bound.
   * @param step Optional. Defaults to 1. Step.
   */
  export function charRange(a: string, b: string, step: number): IterableIterator<string>

  /**
   * @description Combine all the generators passed as parameters into a new generator.
   * @param ranges Range generators to combine together.
   */
  export function newRange(...ranges: Array<IterableIterator<number | string>>): IterableIterator<number | string>

  /**
   * @description A generator that generates a random sequence whose items are chosen from `arr`.
   * @param arr An array of candidates or a generator.
   * @param length The length of generated sequence.
   */
  export function randSeq(arr: any, length: number): IterableIterator<number>
}
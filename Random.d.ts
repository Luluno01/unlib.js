declare namespace Random {
  /**
   * @description Same as `Math random`.
   * @returns {number} Same as `Math.random`.
   */
  export function rand(): number

  /**
   * @description Generate a **floating-point** number randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
   * @param a The lower bound of the generated number.
   * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
   * @returns {number} Generated floating-point number.
   */
  export function random(a: number, b?: number): number

  /**
   * @description Generate an **integer** randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
   * @param a The lower bound of the generated number.
   * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
   * @returns {number} Generated integer.
   */
  export function randint(a: number, b?: number): number

  /**
   * @description Perform a sampling.
   * @param arr The population to sample.
   * @param count The expected number of samples.
   * @param protect Optional. Defaults to `false`. Whether to protect `arr` during sampling. If false, `arr.splice` will be used.
   * @returns {any[]} An array of resulted samples.
   */
  export function sample(arr: Array<any>, count: number, protect?: boolean): Array<any>

  /**
   * @description Shuffle the items in the array given.
   * @param arr The array with items to shuffle.
   * @param protect Optional. Defaults to false. Whether to protect `arr` during shuffle.
   * @returns {any[]} The array that has been shuffled.
   */
  export function shuffle(arr: Array<any>, protect?: boolean): Array<any>

  /**
   * @description Generate a random sequence whose items are chosen from `arr`.
   * @param arr An array of candidates or a generator.
   * @param length The length of generated sequence.
   * @returns {any[]} Generated sequence.
   */
  export function randSeq(arr: any, length: number): Array<any>

  /**
   * @description Generate a random string whose characters are chosen from `arr`.
   * @param arr A candidate string or an array of candidates string or a generator.
   * @param length The length of generated string.
   */
  export function randStr(arr: any, length: number): string
}
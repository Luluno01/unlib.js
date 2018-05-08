import { Constants } from './Constants'
import { Generators } from './Generators'


export namespace Random {
  /**
   * @description Same as `Math random`.
   * @returns {number} Same as `Math.random`.
   */
  export function rand(): number {
    return Math.random()
  }

  /**
   * @description Generate a **floating-point** number randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
   * @param a The lower bound of the generated number.
   * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
   * @returns {number} Generated floating-point number.
   */
  export function random(a: number, b?: number): number {
    if(b == undefined) {
      [a, b] = [0, a]
    }
    return Math.random() * (b - a) + a
  }

  /**
   * @description Generate an **integer** randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
   * @param a The lower bound of the generated number.
   * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
   * @returns {number} Generated integer.
   */
  export function randint(a: number, b?: number): number {
    return Math.floor(Random.random(a, b))
  }

  /**
   * @description Perform a sampling.
   * @param arr The population to sample.
   * @param count The expected number of samples.
   * @param protect Optional. Defaults to `false`. Whether to protect `arr` during sampling. If false, `arr.splice` will be used.
   * @returns {any[]} An array of resulted samples.
   */
  export function sample(arr: Array<any>, count: number, protect?: boolean): Array<any> {
    if(protect) {
      let indexes = []
      for(let i = 0; i < arr.length; i++) {
        indexes.push(false)
      }
      let res = []
      while(res.length < count && res.length != arr.length) {
        let index = Random.randint(arr.length)
        if(indexes[index]) continue
        indexes[index] = true
        res.push(arr[index])
      }
      return res
    } else {
      let res = []
      while(res.length < count && arr.length) {
        res.push(...arr.splice(Random.randint(arr.length), 1))
      }
      return res
    }
  }

  /**
   * @description Shuffle the items in the array given.
   * @param arr The array with items to shuffle.
   * @param protect Optional. Defaults to false. Whether to protect `arr` during shuffle.
   * @returns {any[]} The array that has been shuffled.
   */
  export function shuffle(arr: Array<any>, protect?: boolean): Array<any> {
    let res = Random.sample(arr, arr.length, protect)
    if(!protect) {
      arr.push(...res)
    }
    return res
  }

  /**
   * @description Generate a random sequence whose items are chosen from `arr`.
   * @param arr An array of candidates or a generator.
   * @param length The length of generated sequence.
   * @returns {any[]} Generated sequence.
   */
  export function randSeq(arr: any, length: number) {
    return Array.from(Generators.randSeq(arr, length))
  }

  /**
   * @description Generate a random string whose characters are chosen from `arr`.
   * @param arr A candidate string or an array of candidates string or a generator.
   * @param length The length of generated string.
   */
  export function randStr(arr: any = Constants.VISIBLE_ASCII_CHAR, length: number): string {
    return Array.from(Generators.randSeq(arr, length)).join('')
  }
}
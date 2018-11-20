import Constants from './Constants'
import Generators from './Generators'
import * as assert from 'assert'


namespace Random {
  /**
   * @description Same as `Math random`.
   * @returns {number} Same as `Math.random`.
   */
  export const rand: () => number = Math.random

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
   * @returns {Array<T>} An array of resulted samples.
   */
  export function sample<T>(arr: Array<T>, count: number, protect?: boolean): Array<T> {
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
   * @returns {Array<T>} The array that has been shuffled.
   */
  export function shuffle<T>(arr: Array<T>, protect?: boolean): Array<T> {
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
   * @returns {Array<T>} Generated sequence.
   */
  export function randSeq<T>(arr: ArrayLike<T> | IterableIterator<T>, length: number): Array<T> {
    return Array.from(Generators.randSeq(arr, length))
  }
  
  /**
   * @description Generate a random string whose characters are chosen from `arr`.
   * @param arr A candidate string or an array of candidates string or a generator.
   * @param length The length of generated string.
   * @returns {string} Generated string.
   */
  export function randStr(arr: ArrayLike<string> | IterableIterator<string> = Constants.VISIBLE_ASCII_CHAR, length: number): string {
    return Array.from(Generators.randSeq(arr, length)).join('')
  }

  export namespace Election {

    export interface Candidate extends Object {
      votes: number
    }

    export class Candidate implements Candidate {
      votes: number
      value?: any
      constructor(candidate: Candidate | any, copy: boolean = false) {
        if(candidate instanceof Candidate) {
          // Copy
          if(copy) {
            for(let k in candidate) {
              this[k] = candidate[k]
            }
          } else return candidate
          this.votes = candidate.votes  // Just in case
        } else {
          if(candidate instanceof Object) {  // Subscribable
            this.votes = typeof (candidate as any).votes == 'number' ? (candidate as any).votes : 0
            this.value = candidate
          } else {  // number | string
            this.votes = 0
            this.value = candidate
          }
        }
      }

      /**
       * @description Create a new candidates array from `candidates`.
       * @param candidates Original array.
       */
      static fromArray<T>(candidates: Array<Candidate> | Iterable<T>): Array<Candidate> {
        return Array.prototype.map.call(candidates, can => new Candidate(can, /* non-copy */))
      }
    }

    export interface ElectResult {
      winner: Candidate
      candidates: Array<Candidate>
      records: Array<number>
    }

    /**
     * @description A useless function that simulates a single vote.
     * @param candidates Candidates to vote for.
     * @returns The index of candidate being voted.
     */
    export function vote(candidates: Array<Candidate>): number {
      let voteFor = randint(candidates.length)
      candidates[voteFor].votes++
      return voteFor
    }

    /**
     * @description A useless function that simulates a race election.
     * @param candidates Candidates for the race election.
     * @param maxVotes Max votes to win.
     */
    export function race<T>(candidates: Array<Candidate> | Iterable<T>, maxVotes: number): ElectResult {
      let _race = Generators.race(candidates, maxVotes)
      let res: ElectResult = { winner: null, candidates: null, records: [] }
      let info
      for(let v of _race) {
        res.records.push(v.index)
        info = v
      }
      res.winner = info && info.winner
      res.candidates = info && info.candidates
      return res
    }

    /**
     * @description Yet another useless function that simulates an election.
     * @param candidates Candidates for the election.
     * @param voters The number of voters.
     */
    export function elect<T>(candidates: Array<Candidate> | Iterable<T>, voters: number): ElectResult {
      let _elect = Generators.elect(candidates, voters)
      let res: ElectResult = { winner: null, candidates: null, records: [] }
      let info
      for(let v of _elect) {
        res.records.push(v.index)
        info = v
      }
      res.winner = info && info.winner
      res.candidates = info && info.candidates
      return res
    }
  }
}

export default Random

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in Random) module.exports[key] = Random[key]
} catch {
}
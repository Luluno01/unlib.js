import Random from './Random'

namespace Generators {
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
  export function *newRange<T>(...ranges: Array<IterableIterator<T>>) {
    for(let range of ranges) yield* range
  }

  /**
   * @description A generator that generates a random sequence whose items are chosen from `arr`.
   * @param arr An array of candidates or a generator.
   * @param length The length of generated sequence.
   */
  export function *randSeq<T>(arr: ArrayLike<T> | IterableIterator<T>, length: number) {
    let _arr: Array<T>
    if('next' in arr && arr.next && arr[Symbol.iterator]) _arr = Array.from(arr)  // [...arr]
    for(let i = 0; i < length; i++) {
      yield arr[Random.randint(_arr.length)]
    }
  }

  /**
   * @description Generator version of `Random.elect` which is, once again, somehow, a useless function.
   * @param candidates Candidates for the election.
   * @param maxVotes Max votes to win.
   */
  export function *elect(candidates: Array<Random.Candidate>, maxVotes: number) {
    candidates.forEach(candidate => candidate.votes = 0)
    while(true) {
      for(let candidate of candidates) {
        if(candidate.votes >= maxVotes) return
      }
      // let voteFor = Random.vote(candidates)
      // yield { voteFor: candidates[voteFor], index: voteFor }
      yield candidates[Random.vote(candidates)]
    }
  }
}

export default Generators

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in Generators) module.exports[key] = Generators[key]
} catch {
}
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
    if(typeof arr != 'string' && 'next' in arr && arr.next && arr[Symbol.iterator]) _arr = [...arr]
    else _arr = arr as any
    for(let i = 0; i < length; i++) {
      yield _arr[Random.randint(_arr.length)]
    }
  }

  /**
   * @description A use less function that simulates a race election. Generator version of `Random.Election.race` which is, once again, somehow, a useless function.
   * @param candidates Candidates for the race election.
   * @param maxVotes Max votes to win.
   */
  export function *race<T>(candidates: Array<Random.Election.Candidate> | Iterable<T>, maxVotes: number) {
    let _candidates: Array<Random.Election.Candidate> = Random.Election.Candidate.fromArray(candidates)
    _candidates.forEach(can => can.votes = 0)
    for(let candidate of _candidates) {
      if(candidate.votes >= maxVotes) return
    }
    while(true) {
      let voteFor = Random.Election.vote(_candidates)
      if(_candidates[voteFor].votes >= maxVotes) {
         yield { voteFor: _candidates[voteFor], index: voteFor, winner: _candidates[voteFor], candidates: _candidates }
         return
      } else yield { voteFor: _candidates[voteFor], index: voteFor, candidates: _candidates }
      // yield _candidates[Random.vote(_candidates)]
    }
  }

  /**
   * @description Yet another useless function that simulates an election. Generator version of `Random.Election.elect` which is, once again, somehow, a useless function.
   * @param candidates Candidates for the election.
   * @param voters The number of voters.
   */
  export function *elect<T>(candidates: Array<Random.Election.Candidate> | Iterable<T>, voters: number) {
    let _candidates: Array<Random.Election.Candidate> = Random.Election.Candidate.fromArray(candidates)
    _candidates.forEach(can => can.votes = 0)
    let winner: Random.Election.Candidate
    for(let i of range(1, voters + 1)) {
      let voteFor = Random.Election.vote(_candidates)
      if(!winner || _candidates[voteFor].votes > winner.votes) winner = _candidates[voteFor]
      if(i == voters) yield { voteFor: _candidates[voteFor], index: voteFor, winner: winner, candidates: _candidates }
      else yield { voteFor: _candidates[voteFor], index: voteFor, candidates: _candidates }
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
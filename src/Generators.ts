import { randint, Election } from './Random'


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
    yield _arr[randint(_arr.length)]
  }
}

/**
 * @description A use less function that simulates a race election. Generator version of `Random.Election.race` which is, once again, somehow, a useless function.
 * @param candidates Candidates for the race election.
 * @param maxVotes Max votes to win.
 */
export function *race<T>(candidates: Array<Election.Candidate> | Iterable<T>, maxVotes: number) {
  let _candidates: Array<Election.Candidate> = Election.Candidate.fromArray(candidates)
  _candidates.forEach(can => can.votes = 0)
  for(let candidate of _candidates) {
    if(candidate.votes >= maxVotes) return
  }
  while(true) {
    let voteFor = Election.vote(_candidates)
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
export function *elect<T>(candidates: Array<Election.Candidate> | Iterable<T>, voters: number) {
  let _candidates: Array<Election.Candidate> = Election.Candidate.fromArray(candidates)
  _candidates.forEach(can => can.votes = 0)
  let winner: Election.Candidate
  for(let i of range(1, voters + 1)) {
    let voteFor = Election.vote(_candidates)
    if(!winner || _candidates[voteFor].votes > winner.votes) winner = _candidates[voteFor]
    if(i == voters) yield { voteFor: _candidates[voteFor], index: voteFor, winner: winner, candidates: _candidates }
    else yield { voteFor: _candidates[voteFor], index: voteFor, candidates: _candidates }
  }
}

/**
 * @description Traverse an object in preorder.
 * Yields a tuple whose first element is current object, and the second element is current path.
 * Example:
 * for(let t of preWalk({ a: 1, b: { c: 'rua' } })) {
 *   console.log(`Current node: ${t[0]}, current path: ${t[1]}`)
 * }
 * Output:
 * Current node: [object Object], current path:
 * Current node: 1, current path: a
 * Current node: [object Object], current path: b
 * Current node: rua, current path: b,c
 * @param obj Object to be traversed.
 * @param path Optional. Defaults to `[]`. Initial path (usually `[]`) to `obj`.
 */
export function *preWalk(obj: any, path: (Symbol | string | number)[] = []): IterableIterator<[ any, (Symbol | string | number)[] ]> {
  yield [ obj, path ]
  if(typeof obj == 'object') {
    if(obj instanceof Array) {
      try {
        for(let index in obj) {
          let _index: number | string = parseInt(index)
          if(isNaN(_index)) _index = index
          let _path = path.slice(0)
          _path.push(_index)
          yield *preWalk(obj[index], _path)
        }
      } catch {}
    } else {
      try {
        for(let key in obj) {
          let _path = path.slice(0)
          _path.push(key)
          yield *preWalk(obj[key], _path)
        }
      } catch {}
    }
  }
}

/**
 * @description Traverse an object in postorder.
 * Yields a tuple whose first element is current object, and the second element is current path.
 * Example:
 * for(let t of postWalk({ a: 1, b: { c: 'rua' } })) {
 *   console.log(`Current node: ${t[0]}, current path: ${t[1]}`)
 * }
 * Output:
 * Current node: 1, current path: a
 * Current node: rua, current path: b,c
 * Current node: [object Object], current path: b
 * Current node: [object Object], current path:
 * @param obj Object to be traversed.
 * @param path Optional. Defaults to `[]`. Initial path (usually `[]`) to `obj`.
 */
export function *postWalk(obj: any, path: (Symbol | string | number)[] = []): IterableIterator<[ any, (Symbol | string | number)[] ]> {
  if(typeof obj == 'object') {
    if(obj instanceof Array) {
      try {
        for(let index in obj) {
          let _index: number | string = parseInt(index)
          if(isNaN(_index)) _index = index
          let _path = path.slice(0)
          _path.push(_index)
          yield *postWalk(obj[index], _path)
        }
      } catch {}
    } else {
      try {
        for(let key in obj) {
          let _path = path.slice(0)
          _path.push(key)
          yield *postWalk(obj[key], _path)
        }
      } catch {}
    }
  }
  yield [ obj, path ]
}

/**
 * @description Traverse an object in level order.
 * Yields a tuple whose first element is current object, and the second element is current path.
 * Example:
 * for(let t of levelWalk({ a: [ { e: 1, f: 3 } ], b: { c: 'rua' } })) {
 *   console.log(`Current node: ${t[0]}, current path: ${t[1]}`)
 * }
 * Output:
 * Current node: [object Object], current path:
 * Current node: [object Object], current path: a
 * Current node: [object Object], current path: b
 * Current node: [object Object], current path: a,0
 * Current node: [object Object], current path: a,0
 * Current node: rua, current path: b,c
 * Current node: 1, current path: a,0,e
 * Current node: 3, current path: a,0,f
 * Current node: 1, current path: a,0,e
 * Current node: 3, current path: a,0,f
 * @param path Optional. Defaults to `[]`. Initial path (usually `[]`) to `obj`.
 */
export function *levelWalk(obj: any, path: (Symbol | string | number)[] = []): IterableIterator<[ any, (Symbol | string | number)[] ]> {
  let queue: [ typeof obj, typeof path ][] = [ [ obj, path ] ]
  while(queue.length) {
    let elem = queue.shift()  // Dequeue
    yield elem
    let _obj = elem[0]
    if(typeof _obj == 'object') {
      if(_obj instanceof Array) {
        try {
          for(let index in _obj) {
            let _index: number | string = parseInt(index)
            if(isNaN(_index)) _index = index
            let _path = elem[1].slice(0)
            _path.push(_index)
            queue.push([ _obj[index], _path ])
          }
        } catch {}
      }
      try {
        for(let key in _obj) {
          let _path = elem[1].slice(0)
          _path.push(key)
          queue.push([ _obj[key], _path ])  // Enqueue
        }
      } catch {}
    }
  }
}

/**
 * Enumerate elements and their corresponding indexes of an iterable
 * @param it Iterable to be enumerate
 */
export function *enumerate<T>(it: Iterable<T>): IterableIterator<[ number, T ]> {
  let i = 0
  for(const elem of it) yield [ i++, elem ]
}

/**
 * Nested iterable
 */
export type NestedIterable<T> = Iterable<NestedIterable<T> | T>

/**
 * Flatten an iterable
 * @param its Iterable to be flattened
 * @param depth Optional. Defaults to `Infinity`. Max depth of recursion
 */
export function flat<T>(it: Iterable<T>, depth: 1): IterableIterator<T>
export function flat<T>(it: Iterable<Iterable<T>>, depth: 2): IterableIterator<T>
export function flat<T>(it: Iterable<Iterable<Iterable<T>>>, depth: 3): IterableIterator<T>
export function flat<T>(it: Iterable<Iterable<Iterable<Iterable<T>>>>, depth: 4): IterableIterator<T>
export function flat<T>(it: Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>, depth: 5): IterableIterator<T>
export function flat<T>(it: Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>>, depth: 6): IterableIterator<T>
export function flat<T>(it: Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>>>, depth: 7): IterableIterator<T>
export function flat<T>(it: NestedIterable<T>, depth?: number): NestedIterable<T>
export function *flat<T>(it: NestedIterable<T>, depth: number = Infinity): NestedIterable<T> {
  if(depth <= 0) {
    yield *it
  } else {
    for(const elem of it) {
      if(elem[Symbol.iterator]) yield *flat(elem as NestedIterable<T>, depth - 1)
      else yield elem as T
    }
  }
}

/**
 * Map an iterable
 * @param it Iterable to map
 * @param callbackfn Callback function to be called on every element
 */
export function *map<T, U>(it: Iterable<T>, callbackfn: (value: T, index: number) => U): IterableIterator<U> {
  for(const [ i, elem ] of enumerate(it)) {
    yield callbackfn(elem, i)
  }
}

/**
 * Zip multiple iterables
 * @param its Iterables to zip
 */
export function zip<T1>(it1: T1): IterableIterator<[ T1 ]>
export function zip<T1, T2>(it1: T1, it2: T2): IterableIterator<[ T1, T2 ]>
export function zip<T1, T2, T3>(it1: T1, it2: T2, it3: T3): IterableIterator<[ T1, T2, T3 ]>
export function zip<T1, T2, T3, T4>(it1: T1, it2: T2, it3: T3, it4: T4): IterableIterator<[ T1, T2, T3, T4 ]>
export function zip<T1, T2, T3, T4, T5>(it1: T1, it2: T2, it3: T3, it4: T4, it5: T5): IterableIterator<[ T1, T2, T3, T4, T5 ]>
export function *zip(...its: Iterable<any>[]): IterableIterator<any[]> {
  const _its = its.map(it => it[Symbol.iterator]())
  while(true) {
    let allDone = true
    const res: any[] = new Array(its.length)
    for(const [ i, it ] of enumerate(_its)) {
      const { value, done } = it.next()
      if(!done) allDone = false
      res[i] = value
    }
    if(allDone) return
    yield res
  }
}
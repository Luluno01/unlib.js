export type Comparer<T> = (a: T, b: T) => number

/**
 * Sorted list
 */
export class SortedList<T=number> {
  readonly arr: T[]
  get length() {
    return this.arr.length
  }
  readonly compare!: Comparer<T>
  constructor(arr: T[], compare: Comparer<T> = (a, b) => (a as any) - (b as any)) {
    // `arr` must be sorted
    this.arr = arr
    Object.defineProperty(this, 'compare', {
      writable: false,
      enumerable: false,
      configurable: true,
      value: compare
    })
  }

  /**
   * Ensure the list is sorted
   */
  public sort() {
    this.arr.sort(this.compare)
  }

  /**
   * Add an element to the list
   * @param elem Element to be added to the list
   * @param startIndex Hint of position for searching for position for insertion
   */
  public add(elem: T, startIndex: number = 0) {
    const { arr, compare } = this
    if(startIndex < 0) startIndex = 0
    else if(startIndex > 0) {
      if(compare(elem, arr[startIndex - 1]) < 0) startIndex = 0
    }
    let lo = startIndex
    let hi = arr.length - 1
    let middle = Math.floor((lo + hi) / 2)
    while (lo <= hi) {
      const cmpResult = compare(arr[middle], elem)
      if (cmpResult < 0) {
        // The element in the middle is smaller than the element to add
        lo = middle + 1
      } else if (cmpResult == 0) {
        // The element in the middle is equal to the element to add
        arr.splice(middle, 0, elem)
        return middle
      } else {
        // The element in the middle is larger than the element to add
        hi = middle - 1
      }
      middle = Math.floor((hi + lo) / 2)
    }
    // hi < lo
    arr.splice(lo, 0, elem)
    return lo
  }

  /**
   * Delete an element from the list
   * @param i Element index
   */
  public delete(i: number) {
    return this.arr.splice(i, 1)[0]
  }

  /**
   * Delete an element from the list (alias of `delete`)
   * @param i Element index
   */
  public remove(i: number) {
    return this.arr.splice(i, 1)[0]
  }

  /**
   * Alter an element in the list while keep the list sorted
   * @param i Element index
   * @param func Element altering function
   */
  public alter(i: number, func: (elem: T) => void) {
    func(this.arr[i])
    const elem = this.delete(i)
    return this.add(elem, i - 1)
  }

  [Symbol.iterator]() {
    return this.arr[Symbol.iterator]()
  }
}

export default SortedList

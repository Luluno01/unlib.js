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
    let i = startIndex
    for(const _elem of i ? arr.slice(i) : arr) {
      if(compare(elem, _elem) < 0) {
        arr.splice(i, 0, elem)
        return i
      }
      i++
    }
    arr.push(elem)
    return arr.length - 1
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

import assert = require('assert')

export namespace Binary {
  /**
   * @description Left rotate `num` for `times` times.
   * @param size Size of `num` in bits
   * @param num The integer to rotate.
   * @param times Rotation times. Defaults to 1.
   * @returns {number} Left rotated `num`.
   */
  export function lr(num: number, size: number, times: number = 1): number {
    assert(size > 0)
    const max: number = 1 << size
    assert(num < max)
    for(let i = 0; i < times; i++) {
      num = num << 1
      num = (num & (max - 1)) + (Math.floor(num / max) && 1)
    }
    return num
  }

  /**
   * @description Right rotate `num` for `times` times.
   * @param size Size of `num` in bits
   * @param num The integer to rotate.
   * @param times Rotation times. Defaults to 1.
   * @returns {number} Right rotated `num`.
   */
  export function rr(num: number, size: number, times: number = 1): number {
    assert(size > 0)
    const max: number = 1 << size
    assert(num < max)
    for(let i = 0; i < times; i++) {
      num = (num >> 1) + ((num & 1) << (size - 1))
    }
    return num
  }

  /**
   * @description Small-sized binary class with some helpful utilities.
   */
  export class Binary {
    private value: number = 0
    private _size: number = 8  // One byte
    private mask: number = 255

    /**
     * @description Constructor of `Binary`
     * @param value True value of the `Binary` object (unsigned).
     * @param size Size of this `Binary` object in bits. No larger than the size of `number`.
     */
    constructor(value: number | Binary, size: number = 8) {
      assert(size > 0)
      assert(value >= 0)
      this.mask = (1 << size) - 1
      if(typeof value == 'number') {
        this.value = (Math.floor(value || 0) & this.mask)
        this._size = size
      } else {
        this.value = value.valueOf()
        this._size = value.size
      }
    }

    /**
     * @description Size of this `Binary` object in bits.
     */
    get size(): number {
      return this._size
    }

    /**
     * @description Resize this `Binary` object (in bits). This setter is equivalent to "unsigned extension".
     */
    set size(newSize: number) {
      assert(newSize > 0)
      this._size = newSize
      this.mask = (1 << newSize) - 1
      this.value &= this.mask
    }

    /**
     * @description Resize this `Binary` object (in bits). Equivalent to "signed extension" (if it's an extension).
     * @param newSize New size.
     * @returns {Binary} This object.
     */
    resize(newSize: number): Binary {
      assert(newSize > 0)
      let indexBit = 1 << (this._size - 1)  // Sign bit
      const sign = this.value & indexBit
      this.mask = 1 << newSize
      this.value &= this.mask
      indexBit = 1 << this._size
      if(sign) {
        for(let i = this._size; i < newSize; i++) {
          this.value += indexBit
          indexBit = indexBit << 1
        }
      }
      this._size = newSize
      return this
    }

    /**
     * @description Left rotate the value of this `Binary` object.
     * @param times Rotation times. Defaults to 1.
     * @returns {Binary} This object.
     */
    lr(times: number = 1): Binary {
      this.value = lr(this.value, this._size, times)
      return this
    }

    /**
     * @description Left rotate the value of this `Binary` object without modifying current object.
     * @param times Rotation times. Defaults to 1.
     * @returns {Binary} Left rotated value in a new object.
     */
    lrn(times: number = 1): Binary {
      return new Binary(lr(this.value, this._size, times), this._size)
    }

    /**
     * @description Right rotate the value of this `Binary` object.
     * @param times Rotation times. Defaults to 1.
     * @returns {Binary} This object.
     */
    rr(times: number = 1): Binary {
      this.value = rr(this.value, this._size, times)
      return this
    }

    /**
     * @description Right rotate the value of this `Binary` object without modifying current object.
     * @param times Rotation times. Defaults to 1.
     * @returns {Binary} Right rotated value in a new object.
     */
    rrn(times: number = 1): Binary {
      return new Binary(rr(this.value, this._size, times), this._size)
    }

    /**
     * @description Add `num` to this `Binary` object.
     * @param num Number to add up.
     * @returns {Binary} This object.
     */
    add(num: number | Binary): Binary {
      this.value += num.valueOf()
      if(typeof num == 'number') {
        this.value &= this.mask
      } else {
        this.size = this._size > num.size ? this._size : num.size
      }
      return this
    }

    /**
     * @description Add `num` and this `Binary` object up without modifying current object.
     * @param num Number to add up.
     * @returns {Binary} Sum in a new object.
     */
    addn(num: number | Binary): Binary {
      if(typeof num == 'number') return new Binary(this.value + num.valueOf(), this._size)
      else return (new Binary(this)).add(num)
    }

    /**
     * @description Substract `num` from this `Binary` object.
     * @param num Number to subtract.
     * @returns {Binary} This object.
     */
    sub(num: number | Binary): Binary {
      if(typeof num == 'number') {
        this.add((new Binary(num, this._size)).complement())
      } else {
        if(this._size > num.size) {
          num = (new Binary(num))
          num.size = this._size
          this.add(num.complement())
        } else {
          this.size = num.size
          this.add(num.complementn())
        }
      }
      return this
    }

    /**
     * @description Substract `num` from this `Binary` object without modifying current object.
     * @param num Number to subtract.
     * @returns {Binary} Difference in a new object.
     */
    subn(num: number | Binary): Binary {
      if(typeof num == 'number') return (new Binary(this)).sub(new Binary(num, this._size))
      else return (new Binary(this)).sub(num)
    }

    /**
     * @description Complement of this `Binary` object.
     * @returns {Binary} This object.
     */
    complement(): Binary {
      this.value ^= this.mask
      this.add(1)
      return this
    }

    /**
     * @description Get the complement of this `Binary` object without modifying current object.
     * @returns {Binary} Complement of this `Binary` object in a new object.
     */
    complementn(): Binary {
      return new Binary((this.value ^ this.mask) + 1, this._size);
    }

    /**
     * @description Simply return the value of this `Binary` object.
     * @returns {number} Value of this `Binary` object.
     */
    valueOf(): number {
      return this.value
    }

    /**
     * @description Simply redirect the call of `toString` to the value of this `Binary` object.
     * @returns {stirng}
     */
    toString(...args): string {
      return this.value.toString(...args)
    }
  }
}
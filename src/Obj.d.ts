interface EnhancedObjectConstructor extends ObjectConstructor {
  getOwnPropertyDescriptors<T>(obj: T): { [P in keyof T]: TypedPropertyDescriptor<T[P]> } & PropertyDescriptorMap
  getOwnPropertyNamesAndSymbols(obj: any): (string | symbol)[]
  getPropertyNamesAndSymbols(obj: any): (string | symbol)[]
  getPropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][]
  getPropertyDescriptors(obj: any): PropertyDescriptorMap
  getEnumerablePropertyNamesAndSymbols(obj: any): (string | symbol)[]
  getEnumerablePropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][]
  getEnumerablePropertyDescriptors(obj: any): PropertyDescriptorMap

  assignAll<T, U>(dst: T, src: U): T & U
  assignEnumerable<T, U>(dst: T, src: U): T & U
  assignOwnProperties<T, U>(dst: T, src: U): T & U

  copy<T>(src: T): T & {}
  copyAll<T>(src: T): T & {}
  copyEnumerable<T>(src: T): T & {}
  copyOwnProperties<T>(src: T): T & {}
  append<T, U>(dst: T, src: U): T & U
  appendAll<T, U>(dst: T, src: U): T & U
  appendEnumerable<T, U>(dst: T, src: U): T & U
  appendOwnProperties<T, U>(dst: T, src: U): T & U

  update<T, U>(dst: T, src: U): T
  updateAll<T, U>(dst: T, src: U): T
  updateEnumerable<T, U>(dst: T, src: U): T
  updateOwnProperties<T, U>(dst: T, src: U): T

  getSafeObject<T extends object>(obj: T): T
  get<T extends object, U>(obj: T, properties: (string | number | symbol)[], defaultValue?: U): U | any

  prototype: {
    /* Copied from lib.es5.d.ts */
    constructor: Function
    toString(): string
    toLocaleString(): string
    valueOf(): Object
    hasOwnProperty(v: PropertyKey): boolean
    isPrototypeOf(v: Object): boolean
    propertyIsEnumerable(v: PropertyKey): boolean

    append: <T>(src: T) => T & {}
    appendAll: <T>(src: T) => T & {}
    appendEnumerable: <T>(src: T) => T & {}
    appendOwnProperties: <T>(src: T) => T & {}

    update: <T>(src: T) => T & {}
    updateAll: <T>(src: T) => T & {}
    updateEnumerable: <T>(src: T) => T & {}
    updateOwnProperties: <T>(src: T) => T & {}

    toSafeObject: () => Object
  }
  patch(): void
}
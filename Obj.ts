import * as assert from 'assert'


export interface EnhancedObject extends ObjectConstructor {
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

    update: <T>(src: T) => {}
    updateAll: <T>(src: T) => {}
    updateEnumerable: <T>(src: T) => {}
    updateOwnProperties: <T>(src: T) => {}
  }
  patch(): void
}

namespace _EnhancedObject {
  type ObjectType = typeof Object
  /**
   * @description Same as `Object.getOwnPropertyDescriptors`.
   * @returns {PropertyDescriptorMap}
   */
  export const getOwnPropertyDescriptors = 'getOwnPropertyDescriptors' in Object ?
  (Object as any).getOwnPropertyDescriptors as <T>(obj: T) => { [P in keyof T]: TypedPropertyDescriptor<T[P]> } & PropertyDescriptorMap :
  <T>(obj: T): { [P in keyof T]: TypedPropertyDescriptor<T[P]> } & PropertyDescriptorMap => {
    let properties: PropertyDescriptorMap = {}
    for(let propertyName of (Object as ObjectType).getOwnPropertyNames(obj)) {
      properties[propertyName] = (Object as ObjectType).getOwnPropertyDescriptor(obj, propertyName)
    }
    for(let sym of (Object as ObjectType).getOwnPropertySymbols(obj)) {
      (properties as Object)[sym] = (Object as ObjectType).getOwnPropertyDescriptor(obj, sym)
    }
    return properties as any
  }

  /**
   * @description Get own property names and symbols.
   * @param obj Target object.
   * @returns {(string | symbol)[]}
   */
  export function getOwnPropertyNamesAndSymbols(obj: any): (string | symbol)[] {
    return [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]
  }

  /* All properties */

  /**
   * @description Get all property names and symbols.
   * Including inherited or non-enumerable properties' names & symbols.
   * @param obj Target object.
   * @returns {(string | symbol)}
   */
  export function getPropertyNamesAndSymbols(obj: any): (string | symbol)[] {
    if(!obj) return []
    assert(obj instanceof Object || typeof obj == 'object')
    let names: Set<string | symbol> = obj == Object.prototype ? new Set() : new Set(getPropertyNamesAndSymbols((obj as any).__proto__))  // Get inherited symbols | string
    // Get own symbols | string
    let properties: PropertyDescriptor = getOwnPropertyDescriptors(obj)
    for(let propertyName of getOwnPropertyNamesAndSymbols(properties)) {
      names.add(propertyName)
      // if(Object.prototype.propertyIsEnumerable.call(obj, propertyName)) {
      //   names.add(propertyName)
      // }
    }
    return [...names]
  }

  /**
   * @description Get all property descriptors and names & symbols.
   * Including inherited or non-enumerable properties'.
   * @param obj Target Object.
   * @returns {{ names: Set<string | symbol>; descriptors: PropertyDescriptorMap }}
   */
  function _getPropertyDescriptorsEntries(obj: any): { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } {
    if(!obj) return { names: new Set(), descriptors: {} }
    assert(obj instanceof Object || typeof obj == 'object')
    let des: { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } = obj == Object.prototype ? { names: new Set(), descriptors: {} } : _getPropertyDescriptorsEntries((obj as any).__proto__)  // Get inherited descriptors
    // Get own descriptors
    let properties: PropertyDescriptor = getOwnPropertyDescriptors(obj)
    for(let propertyName of getOwnPropertyNamesAndSymbols(properties)) {
      des.names.add(propertyName)
      let tmp: any = des.descriptors
      tmp[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName)  // Override inherited property
    }
    return des
  }
  
  /**
   * @description Get all property descriptors entries.
   * Including inherited or non-enumerable properties' descriptors.
   * @param obj Target object.
   * @returns {[(string | symbol), PropertyDescriptor][]}
   */
  export function getPropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][] {
    if(!obj) return []
    assert(obj instanceof Object || typeof obj == 'object')
    let _des: any = _getPropertyDescriptorsEntries(obj)
    _des.names = [..._des.names]
    let des = _des.names.map(name => {
      return [name, _des.descriptors[name]]
    })
    return des
  }

  /**
   * @description Get all property descriptors.
   * Including inherited or non-enumerable properties' descriptors.
   * @param obj Target object
   * @returns {PropertyDescriptorMap}
   */
  export function getPropertyDescriptors(obj: any): PropertyDescriptorMap {
    if(!obj) return {}
    assert(obj instanceof Object || typeof obj == 'object')
    return _getPropertyDescriptorsEntries(obj).descriptors
  }

  /* All enumerable propertise */

  /**
   * @description Get all enumerable property names and symbols.
   * Including inherited properties' names & symbols.
   * @param obj Target object.
   * @returns {(string | symbol)}
   */
  export function getEnumerablePropertyNamesAndSymbols(obj: any): (string | symbol)[] {
    if(!obj) return []
    assert(obj instanceof Object || typeof obj == 'object')
    let names: Set<string | symbol> = obj == Object.prototype ? new Set() : new Set(getPropertyNamesAndSymbols((obj as any).__proto__))  // Get inherited symbols | string
    // Get own symbols | string
    let properties: PropertyDescriptor = getOwnPropertyDescriptors(obj)
    for(let propertyName of getOwnPropertyNamesAndSymbols(properties)) {
      // names.add(propertyName)
      if(Object.prototype.propertyIsEnumerable.call(obj, propertyName)) {
        names.add(propertyName)
      } else {
        names.delete(propertyName)
      }
    }
    return [...names]
  }

  /**
   * @description Get all enumerable property descriptors and names & symbols.
   * Including inherited properties'.
   * @param obj Target Object.
   * @returns {{ names: Set<string | symbol>; descriptors: PropertyDescriptorMap }}
   */
  function _getEnumerablePropertyDescriptorsEntries(obj: any): { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } {
    if(!obj) return { names: new Set(), descriptors: {} }
    assert(obj instanceof Object || typeof obj == 'object')
    let des: { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } = obj == Object.prototype ? { names: new Set(), descriptors: {} } : _getEnumerablePropertyDescriptorsEntries((obj as any).__proto__)  // Get inherited descriptors
    // Get own descriptors
    let properties: PropertyDescriptor = getOwnPropertyDescriptors(obj)
    for(let propertyName of getOwnPropertyNamesAndSymbols(properties)) {
      // des.names.add(propertyName)
      // let tmp: any = des.descriptors
      // tmp[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName)  // Override inherited property
      if(Object.prototype.propertyIsEnumerable.call(obj, propertyName)) {
        des.names.add(propertyName)
        let tmp: any = des.descriptors
        tmp[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName)  // Override inherited property
      } else {
        des.names.delete(propertyName)
        let tmp: any = des.descriptors
        delete tmp[propertyName]
      }
    }
    return des
  }
  
  /**
   * @description Get all enumerable property descriptors entries.
   * Including inherited properties' descriptors.
   * @param obj Target object.
   * @returns {[(string | symbol), PropertyDescriptor][]}
   */
  export function getEnumerablePropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][] {
    if(!obj) return []
    assert(obj instanceof Object || typeof obj == 'object')
    let _des: any = _getEnumerablePropertyDescriptorsEntries(obj)
    _des.names = [..._des.names]
    let des = _des.names.map(name => {
      return [name, _des.descriptors[name]]
    })
    return des
  }

  /**
   * @description Get all enumerable property descriptors.
   * Including inherited properties' descriptors.
   * @param obj Target object
   * @returns {PropertyDescriptorMap}
   */
  export function getEnumerablePropertyDescriptors(obj: any): PropertyDescriptorMap {
    if(!obj) return {}
    assert(obj instanceof Object || typeof obj == 'object')
    return _getEnumerablePropertyDescriptorsEntries(obj).descriptors
  }

  /* Assign */

  /**
   * @description Assign `src`'s all properties to `dst`.
   * Inherited or non-enumerable properties will be assigned.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T & U} `dst`.
   */
  export function assignAll<T, U>(dst: T, src: U): T & U {
    if(!src) return dst as any
    assert(dst instanceof Object || typeof dst == 'object')
    return Object.defineProperties(dst, getPropertyDescriptors(src))
  }

  /**
   * @description Assign `src`'s all enumerable properties to `dst`.
   * Inherited properties will be assigned.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T & U} `dst`.
   */
  export function assignEnumerable<T, U>(dst: T, src: U): T & U {
    if(!src) return dst as any
    assert(dst instanceof Object || typeof dst == 'object')
    return Object.defineProperties(dst, getEnumerablePropertyDescriptors(src))
  }

  /**
   * @description Assign all `src`'s own properties to `dst`.
   * Non-enumerable properties will be sssigned.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T & U} `dst`.
   */
  export function assignOwnProperties<T, U>(dst: T, src: U): T & U {
    if(!src) return dst as any
    assert(dst instanceof Object || typeof dst == 'object')
    return Object.defineProperties(dst, getOwnPropertyDescriptors(src))
  }

  export const assignEnumerableOwnProperties: typeof Object.assign = Object.assign

  /* Copy */

  /**
   * @description Copy an object.
   * Only enumerable own properties will be copied.
   * @param src Source object.
   * @returns {T & {}} Copied object.
   */
  export function copy<T>(src: T): T & {} {
    return Object.assign({}, src)
  }

  /**
   * @description Copy an object.
   * Inherited or non-enumerable properties will be copied.
   * @param src Source object.
   * @returns {T & {}} Copied object.
   */
  export function copyAll<T>(src: T): T & {} {
    return assignAll({}, src)
  }

  /**
   * @description Copy an object.
   * Only enumerable properties will be copied.
   * Inherited properties will be copied.
   * @param src Source object.
   * @returns {T & {}} Copied object.
   */
  export function copyEnumerable<T>(src: T): T & {} {
    return assignEnumerable({}, src)
  }

  /**
   * @description Copy an object.
   * Only own properties will be copied.
   * Non-enumerable properties will be copied.
   * @param src Source object.
   * @returns {T & {}} Copied object.
   */
  export function copyOwnProperties<T>(src: T): T & {} {
    return assignOwnProperties({}, src)
  }

  export const copyEnumerableOwnProperties = copy

  /* Append */

  /**
   * @description Append all enumerable own properties of `src` to `dst`.
   * Own properties of `dst` will be reserved.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T & U} `dst`.
   */
  export function append<T, U>(dst: T, src: U): T & U {
    if(!src) return dst as any
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getOwnPropertyNamesAndSymbols(src)) {
      if(!dstOwnPropertyNames.includes(propertyName) && Object.prototype.propertyIsEnumerable.call(src, propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst as T & U
  }

  /**
   * @description Append all properties of `src` to `dst`.
   * Inherited or non-enumerable properties will be appended.
   * Own properties of `dst` will be reserved.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T & U} `dst`.
   */
  export function appendAll<T, U>(dst: T, src: U): T & U {
    if(!src) return dst as any
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getPropertyNamesAndSymbols(src)) {
      if(!dstOwnPropertyNames.includes(propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst as T & U
  }

  /**
   * @description Append all enumerable properties of `src` to `dst`.
   * Inherited properties will be appended.
   * Own properties of `dst` will be reserved.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T & U} `dst`.
   */
  export function appendEnumerable<T, U>(dst: T, src: U): T & U {
    if(!src) return dst as any
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getEnumerablePropertyNamesAndSymbols(src)) {
      if(!dstOwnPropertyNames.includes(propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst as T & U
  }

  /**
   * @description Append all own properties of `src` to `dst`.
   * Non-enumerable properties will be appended.
   * Own properties of `dst` will be reserved.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T & U} `dst`.
   */
  export function appendOwnProperties<T, U>(dst: T, src: U): T & U {
    if(!src) return dst as any
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getOwnPropertyNamesAndSymbols(src)) {
      if(!dstOwnPropertyNames.includes(propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst as T & U
  }

  /* Update */

  /**
   * @description Update `dst` with enumerable own properties of `src`.
   * None-own-properties of `dst` will not be updated.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T} `dst`.
   */
  export function update<T, U>(dst: T, src: U): T {
    if(!src) return dst
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getOwnPropertyNamesAndSymbols(src)) {
      if(dstOwnPropertyNames.includes(propertyName) && Object.prototype.propertyIsEnumerable.call(src, propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst
  }

  /**
   * @description Update `dst` with all properties of `src`.
   * Inherited or non-enumerable will be considered.
   * None-own-properties of `dst` will not be updated.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T} `dst`.
   */
  export function updateAll<T, U>(dst: T, src: U): T {
    if(!src) return dst
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getPropertyNamesAndSymbols(src)) {
      if(dstOwnPropertyNames.includes(propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst
  }

  /**
   * @description Update `dst` with all enumerable properties of `src`.
   * Inherited properties will be considered.
   * None-own-properties of `dst` will not be updated.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T} `dst`.
   */
  export function updateEnumerable<T, U>(dst: T, src: U): T {
    if(!src) return dst
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getEnumerablePropertyNamesAndSymbols(src)) {
      if(dstOwnPropertyNames.includes(propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst
  }

  /**
   * @description Update `dst` with all own properties of `src`.
   * Non-enumerable properties will be considered.
   * None-own-properties of `dst` will not be updated.
   * @param dst Destination object.
   * @param src Source object.
   * @returns {T} `dst`.
   */
  export function updateOwnProperties<T, U>(dst: T, src: U): T {
    if(!src) return dst
    assert(dst instanceof Object || typeof dst == 'object')
    let dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst)
    for(let propertyName of getOwnPropertyNamesAndSymbols(src)) {
      if(dstOwnPropertyNames.includes(propertyName)) dst[propertyName] = src[propertyName]
    }
    return dst
  }

  // interface prototype {
  //   append: <T>(src: T) => T & {}
  //   appendAll: <T>(src: T) => T & {}
  //   appendEnumerable: <T>(src: T) => T & {}
  //   appendOwnProperties: <T>(src: T) => T & {}

  //   update: <T>(src: T) => {}
  //   updateAll: <T>(src: T) => {}
  //   updateEnumerable: <T>(src: T) => {}
  //   updateOwnProperties: <T>(src: T) => {}
  // }

  let proto = (function() {
    let proto = {}
    for(let name in _EnhancedObject) {
      if(name.startsWith('append') || name.startsWith('update')) {
        Object.defineProperty(proto, name, {
          value: function(src) {
            return _EnhancedObject[name](this, src)
          },
          writable: true,
          enumerable: false,
          configurable: true
        })
        Object.defineProperty(proto[name], 'name', {
          value: name,
          writable: false,
          enumerable: false,
          configurable: true
        })
      }
    }
    return proto
  })()

  let protoList = (function() {
    let proto = []
    for(let name in _EnhancedObject) {
      if(name.startsWith('append') || name.startsWith('update')) {
        proto.push(name)
      }
    }
    return proto
  })()

  export let prototype = appendOwnProperties(proto, Object.prototype)
  Object.defineProperty(_EnhancedObject, 'prototype', { value: prototype, writable: true, enumerable: false, configurable: true })
  for(let proto of getOwnPropertyNamesAndSymbols(prototype)) {
    Object.defineProperty(prototype, proto, { value: prototype[proto], writable: true, enumerable: false, configurable: true })
  }

  /**
   * @description Patch built-in `Object` with `EnhancedObject`.
   */
  export function patch() {
    append(Object, _EnhancedObject)
    for(let name of protoList) {
      Object.defineProperty(
        Object.prototype,
        name, {
          value: _EnhancedObject.prototype[name],
          writable: true,
          enumerable: false,
          configurable: true
        }
      )
    }
  }
}
_EnhancedObject.appendOwnProperties(_EnhancedObject, Object)

function EnhancedObject() {}
_EnhancedObject.appendOwnProperties(EnhancedObject, _EnhancedObject)
EnhancedObject.prototype = new Object  // Force extends
_EnhancedObject.appendOwnProperties(EnhancedObject.prototype, _EnhancedObject.prototype)  // Force implement

export default EnhancedObject as EnhancedObject

declare var module: any
try {
module.exports = _EnhancedObject.assignOwnProperties((function EnhancedObject() {}), EnhancedObject)
module.exports.default = EnhancedObject
} catch {
}

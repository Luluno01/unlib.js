/// <reference path="./Obj.d.ts" />
import * as assert from 'assert'


type ObjectType = typeof Object

function getExport() {
  class EnhancedObject extends Object {
    /**
     * @description Same as `Object.getOwnPropertyDescriptors`.
     * @returns {PropertyDescriptorMap}
     */
    static getOwnPropertyDescriptors = 'getOwnPropertyDescriptors' in Object ?
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
    static getOwnPropertyNamesAndSymbols(obj: any): (string | symbol)[] {
      return [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]
    }

    /* All properties */

    /**
     * @description Get all property names and symbols.
     * Including inherited or non-enumerable properties' names & symbols.
     * @param obj Target object.
     * @returns {(string | symbol)}
     */
    static getPropertyNamesAndSymbols(obj: any): (string | symbol)[] {
      if(!obj) return []
      assert(obj instanceof Object || typeof obj == 'object')
      let names: Set<string | symbol> = obj == Object.prototype ? new Set() : new Set(EnhancedObject.getPropertyNamesAndSymbols((obj as any).__proto__))  // Get inherited symbols | string
      // Get own symbols | string
      let properties = EnhancedObject.getOwnPropertyDescriptors(obj)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(properties)) {
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
    private static _getPropertyDescriptorsEntries(obj: any): { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } {
      if(!obj) return { names: new Set(), descriptors: {} }
      assert(obj instanceof Object || typeof obj == 'object')
      let des: { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } = obj == Object.prototype ? { names: new Set(), descriptors: {} } : EnhancedObject._getPropertyDescriptorsEntries((obj as any).__proto__)  // Get inherited descriptors
      // Get own descriptors
      let properties = EnhancedObject.getOwnPropertyDescriptors(obj)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(properties)) {
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
    static getPropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][] {
      if(!obj) return []
      assert(obj instanceof Object || typeof obj == 'object')
      let _des: any = EnhancedObject._getPropertyDescriptorsEntries(obj)
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
    static getPropertyDescriptors(obj: any): PropertyDescriptorMap {
      if(!obj) return {}
      assert(obj instanceof Object || typeof obj == 'object')
      return EnhancedObject._getPropertyDescriptorsEntries(obj).descriptors
    }

    /* All enumerable propertise */

    /**
     * @description Get all enumerable property names and symbols.
     * Including inherited properties' names & symbols.
     * @param obj Target object.
     * @returns {(string | symbol)}
     */
    static getEnumerablePropertyNamesAndSymbols(obj: any): (string | symbol)[] {
      if(!obj) return []
      assert(obj instanceof Object || typeof obj == 'object')
      let names: Set<string | symbol> = obj == Object.prototype ? new Set() : new Set(EnhancedObject.getPropertyNamesAndSymbols((obj as any).__proto__))  // Get inherited symbols | string
      // Get own symbols | string
      let properties = EnhancedObject.getOwnPropertyDescriptors(obj)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(properties)) {
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
    private static _getEnumerablePropertyDescriptorsEntries(obj: any): { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } {
      if(!obj) return { names: new Set(), descriptors: {} }
      assert(obj instanceof Object || typeof obj == 'object')
      let des: { names: Set<string | symbol>; descriptors: PropertyDescriptorMap } = obj == Object.prototype ? { names: new Set(), descriptors: {} } : EnhancedObject._getEnumerablePropertyDescriptorsEntries((obj as any).__proto__)  // Get inherited descriptors
      // Get own descriptors
      let properties = EnhancedObject.getOwnPropertyDescriptors(obj)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(properties)) {
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
    static getEnumerablePropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][] {
      if(!obj) return []
      assert(obj instanceof Object || typeof obj == 'object')
      let _des: any = EnhancedObject._getEnumerablePropertyDescriptorsEntries(obj)
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
    static getEnumerablePropertyDescriptors(obj: any): PropertyDescriptorMap {
      if(!obj) return {}
      assert(obj instanceof Object || typeof obj == 'object')
      return EnhancedObject._getEnumerablePropertyDescriptorsEntries(obj).descriptors
    }

    /* Assign */

    /**
     * @description Assign `src`'s all properties to `dst`.
     * Inherited or non-enumerable properties will be assigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    static assignAll<T, U>(dst: T, src: U): T & U {
      if(!src) return dst as any
      assert(dst instanceof Object || typeof dst == 'object')
      return Object.defineProperties(dst, EnhancedObject.getPropertyDescriptors(src))
    }

    /**
     * @description Assign `src`'s all enumerable properties to `dst`.
     * Inherited properties will be assigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    static assignEnumerable<T, U>(dst: T, src: U): T & U {
      if(!src) return dst as any
      assert(dst instanceof Object || typeof dst == 'object')
      return Object.defineProperties(dst, EnhancedObject.getEnumerablePropertyDescriptors(src))
    }

    /**
     * @description Assign all `src`'s own properties to `dst`.
     * Non-enumerable properties will be sssigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    static assignOwnProperties<T, U>(dst: T, src: U): T & U {
      if(!src) return dst as any
      assert(dst instanceof Object || typeof dst == 'object')
      return Object.defineProperties(dst, EnhancedObject.getOwnPropertyDescriptors(src))
    }

    static assignEnumerableOwnProperties: typeof Object.assign = Object.assign

    /* Copy */

    /**
     * @description Copy an object.
     * Only enumerable own properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    static copy<T>(src: T): T & {} {
      return Object.assign({}, src)
    }

    /**
     * @description Copy an object.
     * Inherited or non-enumerable properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    static copyAll<T>(src: T): T & {} {
      return EnhancedObject.assignAll({}, src)
    }

    /**
     * @description Copy an object.
     * Only enumerable properties will be copied.
     * Inherited properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    static copyEnumerable<T>(src: T): T & {} {
      return EnhancedObject.assignEnumerable({}, src)
    }

    /**
     * @description Copy an object.
     * Only own properties will be copied.
     * Non-enumerable properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    static copyOwnProperties<T>(src: T): T & {} {
      return EnhancedObject.assignOwnProperties({}, src)
    }

    static copyEnumerableOwnProperties = EnhancedObject.copy

    /* Append */

    /**
     * @description Append all enumerable own properties of `src` to `dst`.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    static append<T, U>(dst: T, src: U): T & U {
      if(!src) return dst as any
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(src)) {
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
    static appendAll<T, U>(dst: T, src: U): T & U {
      if(!src) return dst as any
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getPropertyNamesAndSymbols(src)) {
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
    static appendEnumerable<T, U>(dst: T, src: U): T & U {
      if(!src) return dst as any
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getEnumerablePropertyNamesAndSymbols(src)) {
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
    static appendOwnProperties<T, U>(dst: T, src: U): T & U {
      if(!src) return dst as any
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(src)) {
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
    static update<T, U>(dst: T, src: U): T {
      if(!src) return dst
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(src)) {
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
    static updateAll<T, U>(dst: T, src: U): T {
      if(!src) return dst
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getPropertyNamesAndSymbols(src)) {
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
    static updateEnumerable<T, U>(dst: T, src: U): T {
      if(!src) return dst
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getEnumerablePropertyNamesAndSymbols(src)) {
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
    static updateOwnProperties<T, U>(dst: T, src: U): T {
      if(!src) return dst
      assert(dst instanceof Object || typeof dst == 'object')
      let dstOwnPropertyNames = EnhancedObject.getOwnPropertyNamesAndSymbols(dst)
      for(let propertyName of EnhancedObject.getOwnPropertyNamesAndSymbols(src)) {
        if(dstOwnPropertyNames.includes(propertyName)) dst[propertyName] = src[propertyName]
      }
      return dst
    }

    private static _Proxy: ProxyConstructor = Proxy || function() {
      throw new Error('Global object `Proxy` is required for safe object')
    } as any as ProxyConstructor
    static emptySafeObject: object = Object.freeze(new EnhancedObject._Proxy({}, {
      get: () => EnhancedObject.emptySafeObject,
      set(target, property, value) {
        throw new Error('Attempt to set property on empty safe object')
      }
    }))
    private static handler: ProxyHandler<object> = {
      get(target, property) {
        const val = target[property]
        switch(typeof val) {
          case 'function':
          case 'object': return val == null ? EnhancedObject.emptySafeObject : new EnhancedObject._Proxy(val, EnhancedObject.handler)
          case 'undefined': return EnhancedObject.emptySafeObject
          default: return val
        }
      },
      set(target, property, value) {
        throw new Error('Attempt to set property on a read-only safe object')
      }
    }
    /**
     * @description Get safe wrap of an object.
     * Wrap an existing object as an safe object, which will not raise `TypeError: Cannot read property 'someProperty' of undefined/null` errors by returning `emptySafeObject` (which is a unique and non-false constant) when encounters undefined/null property.
     * Note that returned value is a read-only object (for safe read access to properties only).
     * @param obj Object to wrap.
     */
    static getSafeObject<T extends object>(obj: T): T {
      return new EnhancedObject._Proxy(obj, EnhancedObject.handler) as T
    }

    /**
     * @description Get the value at specified property path of an object.
     * Will not raise `TypeError: Cannot read property 'someProperty' of undefined/null` errors but return given default value when encountering undefined/null property.
     * @param obj Target object.
     * @param properties Property path. e.g. [ 'propertyA', 0, 'propertyB' ].
     * @param defaultValue Default value.
     */
    static get<T extends object, U>(obj: T, properties: (string | number | symbol)[], defaultValue?: U): U | any {
      if(obj == null || obj == undefined) return defaultValue
      for(let property of properties) {
        const val = obj[property]
        switch(typeof obj) {
          // case 'function':
          // case 'object': obj = val; break
          case 'undefined': return defaultValue
          default: obj = val
        }
        if(obj == null || obj == undefined) return defaultValue
      }
      return obj == null || obj == undefined ? defaultValue : obj
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

    private static protoList = (function() {
      let proto = [ 'toSafeObject' ]
      for(let name in EnhancedObject) {
        if(name.startsWith('append') || name.startsWith('update')) {
          proto.push(name)
        }
      }
      return proto
    })()

    private static proto = (function() {
      let proto = {}
      for(let name of EnhancedObject.protoList) {
        if(name in EnhancedObject) {
          Object.defineProperty(proto, name, {
            value: function(...args) {
              return EnhancedObject[name](this, ...args)
            },
            writable: true,
            enumerable: false,
            configurable: true
          } as any)
          Object.defineProperty(proto[name], 'name', {
            value: name,
            writable: false,
            enumerable: false,
            configurable: true
          } as any)
        }
      }
      // Special process for `toSafeObject`
      const _name = 'toSafeObject'
      Object.defineProperty(proto, _name, {
        value: function() {
          return EnhancedObject.getSafeObject(this)
        },
        writable: true,
        enumerable: false,
        configurable: true
      } as any)
      Object.defineProperty(proto[_name], 'name', {
        value: _name,
        writable: false,
        enumerable: false,
        configurable: true
      } as any)
      EnhancedObject.appendOwnProperties(EnhancedObject.prototype, proto)
      return proto
    })()

    /**
     * @description Patch built-in `Object` with `EnhancedObject`.
     */
    static patch() {
      EnhancedObject.append(Object, EnhancedObject)
      for(let name of EnhancedObject.protoList) {
        Object.defineProperty(
          Object.prototype,
          name,
          {
            value: EnhancedObject.prototype[name],
            writable: true,
            enumerable: false,
            configurable: true
          } as any
        )
      }
    }
  }
  for(let proto of EnhancedObject.getOwnPropertyNamesAndSymbols(EnhancedObject.prototype)) {
    Object.defineProperty(EnhancedObject.prototype, proto, {
      value: EnhancedObject.prototype[proto],
      writable: true,
      enumerable: false,
      configurable: true
    } as any)
  }
  return EnhancedObject
}

export let EnhancedObject = (getExport() as unknown) as EnhancedObjectConstructor
export default EnhancedObject
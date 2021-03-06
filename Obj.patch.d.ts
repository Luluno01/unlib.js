import { EnhancedObject } from './src/Obj'

/**
 * Once you've called `unlib.Object.patch`, you are able to use the following methods.
 */
declare global {
  interface Object {
    append: <T>(src: T) => T & {}
    appendAll: <T>(src: T) => T & {}
    appendEnumerable: <T>(src: T) => T & {}
    appendOwnProperties: <T>(src: T) => T & {}

    update: <T>(src: T) => {}
    updateAll: <T>(src: T) => {}
    updateEnumerable: <T>(src: T) => {}
    updateOwnProperties: <T>(src: T) => {}

    getSafeObject<T extends object>(obj: T): T
    get<T extends object, U>(obj: T, properties: (string | number | symbol)[], defaultValue?: U): U | any
  }
}
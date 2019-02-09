import { loadJSON, dumpJSON } from './fs'


export interface EnhancedJSON extends JSON {
  load: typeof loadJSON
  dump: typeof dumpJSON
}

export const parse: typeof JSON.parse = JSON.parse
export const stringify: typeof JSON.stringify = JSON.stringify
export const load: typeof loadJSON = loadJSON
export const dump: typeof dumpJSON = dumpJSON

declare var module: any
try {
  Object.defineProperty(module.exports, Symbol.toStringTag, {...Object.getOwnPropertyDescriptor(JSON, Symbol.toStringTag), value: 'EnhancedJSON'})
} catch(err) {}
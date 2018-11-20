import fs from './fs'


export interface EnhancedJSON extends JSON {
  load: typeof fs.loadJSON
  dump: typeof fs.dumpJSON
}

const EnhancedJSON: EnhancedJSON = {
  [Symbol.toStringTag]: 'JSON',
  parse: JSON.parse,
  stringify: JSON.stringify,
  load: fs.loadJSON,
  dump: fs.dumpJSON
}

Object.defineProperty(EnhancedJSON, Symbol.toStringTag, {...Object.getOwnPropertyDescriptor(JSON, Symbol.toStringTag), value: 'EnhancedJSON'})

export default EnhancedJSON
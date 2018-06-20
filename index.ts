import Generators from './Generators'
import Random from './Random'
import Constants from './Constants'
import Binary from './Binary'
import Time from './Time'
import Prom from './Prom'
import * as fs from './fs'
import JSON from './JSON'
import * as Obj from './Obj'

var unlib = {
  Random,
  Generators,
  Constants,
  Binary,
  Time,
  Prom,
  fs: fs.default,
  JSON,
  Obj: Obj.default
}

export default unlib

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in unlib) module.exports[key] = unlib[key]
} catch {
}

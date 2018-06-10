import Generators from './Generators'
import Random from './Random'
import Constants from './Constants'
import Binary from './Binary'
import Time from './Time'
import Promise from './Prom'
import * as fs from './fs'

var unlib = {
  Random,
  Generators,
  Constants,
  Binary,
  Time,
  Promise,
  fs: fs.default
}

export default unlib

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in unlib) module.exports[key] = unlib[key]
} catch {
}

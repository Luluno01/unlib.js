import Generators from './Generators'
import Random from './Random'
import Constants from './Constants'
import Binary from './Binary'
import Time from './Time'
import Prom from './Prom'
import fs from './fs'
import JSON from './JSON'
import Obj from './Obj'
import Math from './Math'
import TaskQueue from './TaskQueue'

var unlib = {
  Random,
  Generators,
  Constants,
  Binary,
  Time,
  Prom,
  fs,
  JSON,
  Object: Obj,
  Math,
  TaskQueue
}

export default unlib

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in unlib) module.exports[key] = unlib[key]
} catch {
}

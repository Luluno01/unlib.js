import { Generators } from './Generators'
import { Random } from './Random'
import { Constants } from './Constants'
import { Binary } from './Binary'
import { Timer } from './Timer'
import { Prom as Promise } from './Prom'
import { fs } from './fs'

var _default = {
  Random,
  Generators,
  Constants,
  Binary,
  Timer,
  Promise,
  fs
}

export default _default

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in _default) module.exports[key] = _default[key]
} catch {
}
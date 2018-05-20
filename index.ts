import { Generators } from './Generators'
import { Random } from './Random'
import { Constants } from './Constants'
import { Binary } from './Binary'
import { Timer } from './Timer'

var _default = {
  Random,
  Generators,
  Constants,
  Binary,
  Timer
}

export default _default

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in _default) module.exports[key] = _default[key]
} catch {
}
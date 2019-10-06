import { Timer } from './Timer'
import { sleep } from './sleep'
import { timeoutify } from './timeoutify'

var Time = {
  Timer,
  sleep,
  timeoutify
}

export default Time

declare var module: any
try {
for(var key in Time) module.exports[key] = Time[key]
} catch {
}

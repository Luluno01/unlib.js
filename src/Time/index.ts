import { Timer } from './Timer'
import { sleep } from './sleep'

var Time = {
  Timer,
  sleep
}

export default Time

declare var module: any
try {
for(var key in Time) module.exports[key] = Time[key]
} catch {
}

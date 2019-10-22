import { EventBarrier } from './EventBarrier'
import { Lock } from './Lock'

var Sync = {
  EventBarrier,
  Lock
}

export default Sync

declare var module: any
try {
for(var key in Sync) module.exports[key] = Sync[key]
} catch {
}

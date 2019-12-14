import { EventBarrier } from './EventBarrier'
import { Lock } from './Lock'
import { Semaphore, CountedSemaphore } from './Semaphore'

var Sync = {
  EventBarrier,
  Lock,
  Semaphore,
  CountedSemaphore
}

export default Sync

declare var module: any
try {
for(var key in Sync) module.exports[key] = Sync[key]
} catch {
}

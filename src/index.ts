/// <reference path="./Obj.d.ts" />
import * as _Generators from './Generators'
import * as _Random from './Random'
import * as _Constants from './Constants'
import * as _Binary from './Binary'
import _Time from './Time'
import * as _Prom from './Prom'
import * as _fs from './fs'
import * as _JSON from './JSON'
import Obj from './Obj'
import * as _Math from './Math'
import _TaskQueue from './TaskQueue'
import _EventBarrier from './EventBarrier'

export const Random = _Random
export const Generators = _Generators
export const Constants = _Constants
export const Binary = _Binary
export const Time = _Time
export const Prom = _Prom
export const fs = _fs
export const JSON = _JSON
export const Object = Obj as EnhancedObjectConstructor
export const Math = _Math
export const TaskQueue = _TaskQueue
export const EventBarrier = _EventBarrier
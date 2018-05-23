# unlib.js

Untitled's personal JavaScript library. Still under construction.

## Description

A JavaScript library for personal use and learning. Written in [TypeScript](www.typescriptlang.org) (I am a newbie at TypeScript). This library contains several functions and classes which implement some easy-to-understand but non-easy-to-realize functions and mechanisms.

Anyone who finds a bug of this library is welcomed to open an issue :P.

## Usage

Assume that you have already cloned this repository to your local workspace.

### Pure JavaScript

```JavaScript
const unlib = require('./unlib.js');
```

or

```JavaScript
const { Random, Generatos, Binary, Timer, Constants } = require('./unlib.js');
```

or

### TypeScript/ES6

```TypeScript
import * as unlib from './unlib.js'
```

or

```TypeScript
import { Random, Generatos, Binary, Timer, Constants } from './unlib.js'
```

or

```TypeScript
import unlib from './unlib.js'
```

## Features (extending)

This library has only 5 types of functionalities currently. I will implement some more ~~wheels~~ functionalities once I have to deal with some boring and repeated works.

Somehow, I can not provide detailed documentation for now. If you are interested in this library and require more details, feel free to open an issue to let me know which part of this library makes you confused or whatever you want to know about this repository.

### `Random`

Some helper functions to generate random numbers and sequences. You can also do some sampling or shuffle an array with `sample` and `shuffle`.

### `Generators`

Some generators/iterators including `range` and `charRange`, as well as a generator version of `Random.randSeq` which generates a random sequence of specified length.

### `Binary`

Some functions and classes for binary processing (circular shifting, complement, etc.)

### `Timer`

A timer class that calls your callback function at specified interval with an optional max timing duration.

### `Constants`

Some constants.

## TODO

- [ ] A new binary class using `Buffer` as storage instead of `number`.
- [ ] More constants.
- [ ] More detailed documentation.
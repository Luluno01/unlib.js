# unlib.js

Untitled's personal JavaScript library. Still under construction.

## Table of Contents

- [unlib.js](#unlibjs)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Usage](#usage)
    - [Pure JavaScript](#pure-javascript)
    - [TypeScript/ES6](#typescriptes6)
    - [Import a sub-module](#import-a-sub-module)
  - [Features (extending)](#features-extending)
    - [`Random`](#random)
    - [`Generators`](#generators)
    - [`Binary`](#binary)
    - [`Time`](#time)
      - [`Timer`](#timer)
      - [`sleep`](#sleep)
    - [`Promise`](#promise)
    - [`fs`](#fs)
      - [`mkdirs`](#mkdirs)
      - [`rm`](#rm)
    - [`Object`](#object)
    - [`Math`](#math)
    - [`Constants`](#constants)
  - [TODO](#todo)

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
const { Random, Generators, Binary, Time, Promise, fs, Constants } = require('./unlib.js');
```

or

### TypeScript/ES6

```TypeScript
import * as unlib from './unlib.js'

console.log(unlib.Random.randint(1, 101))
```

or

```TypeScript
import { Random, Generators, Binary, Time, Promise, fs, Constants } from './unlib.js'

console.log(Random.randint(1, 101))
```

or

```TypeScript
import unlib from './unlib.js'

console.log(unlib.Random.randint(1, 101))
```

### Import a sub-module

Just simply `require` or `import-from` `'./unlib.js/sub-module'`.

e.g. Import the module `Random`:

```JavaScript
const Random = require('./unlib.js/Random')
```

or

```TypeScript
import Random from './unlib.js/Random'
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

### `Time`

Sub-module `Time` including `sleep` and `Timer`.

#### `Timer`

A timer class that calls your callback function at specified interval with an optional max timing duration.

#### `sleep`

Promise version of `setTimeout`.

### `Promise`

Some promisify functions.

### `fs`

Promise version of built-in object `fs` as well as some promisified custom functions.

#### `mkdirs`

Make a directory recursively.

#### `rm`

Remove a file or directory recursively.

### `Object`

Some other helpful functions and prototype functions enhancing built-in object `Object` including `getEnumerablePropertyDescriptors`, `assignAll`, `copy`, `append`, `update`, etc.

### `Math`

Factorial, permutation, combination calculation, sum, mean, variance calculation functions for now.

### `Constants`

Some constants.

## TODO

- [ ] A new binary class using `Buffer` or `TypedArray` as storage instead of `number`.
- [ ] More constants.
- [ ] More detailed documentation.
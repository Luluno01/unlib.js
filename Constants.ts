namespace Constants {
  /**
   * @description All visible ASCII characters.
   */
  export const VISIBLE_ASCII_CHAR = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'  // Generators.charRange('!', '~')
}

export default Constants

declare var module: any
try {
  // Object.assign(module.exports, _default)
  for(var key in Constants) module.exports[key] = Constants[key]
} catch {
}
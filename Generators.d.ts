declare namespace Generators {
    /**
     * @description A generator that generates a sequence ranged [`a`, `b`) at a pace of `step` per step.
     * @param a The lower bound.
     * @param b Optional. The upper bound. If not set, the range would be [0, `a`).
     * @param step Optional. Defaults to 1. Step.
     */
    function range(a: number, b?: number, step?: number): IterableIterator<number>;
    /**
     * @description A generator that generates a characters sequence ranged [`a`, `b`] at a pace of `step` per step.
     * @param a The lower bound.
     * @param b The upper bound.
     * @param step Optional. Defaults to 1. Step.
     */
    function charRange(a: string, b: string, step?: number): IterableIterator<string>;
    /**
     * @description Combine all the generators passed as parameters into a new generator.
     * @param ranges Range generators to combine together.
     */
    function newRange(...ranges: Array<IterableIterator<number | string>>): IterableIterator<string | number>;
    /**
     * @description A generator that generates a random sequence whose items are chosen from `arr`.
     * @param arr An array of candidates or a generator.
     * @param length The length of generated sequence.
     */
    function randSeq(arr: any, length: number): IterableIterator<any>;
}
export default Generators;

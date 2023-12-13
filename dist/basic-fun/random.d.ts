export declare const random: {
    /** This function generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
     *
     * @returns a random number between 0 and 1
     */
    random: () => number;
    /** This function generates a random integer within the specified range.
     *
     * @param start
     * @param end
     * @returns a random integer in the given range
     */
    randint: (start: number, end: number) => number;
    /** shuffle the given array, support any type of array
     *
     * @param array
     * @returns an array
     */
    shuffle_new: <T>(array: T[]) => T[];
    /**
     * Randomly shuffles an array in-place using Knuth's algorithm
     * (an optimized version of the Fisher-Yates shuffle, see
     * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle and
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * @param {Array} array The array to shuffle
     * Returns:
     *      Nothing, randomizes in-place
     */
    shuffle: <T_1>(array: T_1[]) => void;
    /** Sample a specified number of elements from an array, allowing for either repeated or non-repeated sampling.
     *
     * @param arr
     * @param num  The sample size.
     * @param repeat if true, the sampled array could have repeated element; otherwise, not.
     * @returns
     */
    sample: <T_2>(arr: T_2[], num: number, repeat?: boolean) => T_2[];
};

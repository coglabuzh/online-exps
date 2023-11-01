export declare const generateArray: {
    /**
     *  generate a series of letters
     * @param capital logical; if true, an array of capitalized letters will be returned; if false, return uncapitalized letters.
     * @returns
     */
    alphabet: (capital?: boolean, excludeVowels?: boolean) => string[];
    /**
     * generate a series of numbers, both minimum and maximum are included
     * @param start a number; the minimum number of the series
     * @param end  a number; the maximum number of the series
     * @param step a number; the interval between each two numbers.
     * @returns
     */
    number: (start: number, end: number, step?: number) => number[];
};

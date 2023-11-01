"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Chooses `n` elements from the given array randomly.
 *
 * @param arr - The source array from which to choose elements.
 * @param n - The number of elements to choose from the source array.
 * @returns An array containing `n` elements chosen from the source array.
 */
function chooseNElementsFromArray(arr, n) {
    const result = [];
    // make a copy of the original array
    const copy = structuredClone(arr);
    for (let i = 0; i < n && copy.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        result.push(copy[randomIndex]);
        copy.splice(randomIndex, 1); // remove the chosen element from the copy
    }
    return result;
}
exports.default = chooseNElementsFromArray;

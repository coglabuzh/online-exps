"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
/**
 * find all index which match the condition
 *
 * @param {Array} arr the array to search elements
 * @param {number|string} item detected item.
 * @param {boolean} match boolean; if true, return matched index; if false, return unmatched index.
 * @returns
 */
const getIndex = function (arr, item, match = true) {
    var indexes = [], i = -1;
    if (match) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item)
                indexes.push(i);
        }
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== item)
                indexes.push(i);
        }
    }
    return indexes;
};
exports.getIndex = getIndex;

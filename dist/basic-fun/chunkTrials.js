"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkTrials = void 0;
/**
 * split trials into some blocks
 *
 * @param {Array} trials all trials
 * @param {Number} nBlock number of blocks.
 *
 * @returns An array of blocks, each block is an array of trials.
 */
const chunkTrials = function (trials, nBlock = 2) {
    var chunkSize = Math.ceil(trials.length / nBlock);
    var blocks = [];
    for (var i of Array(nBlock).keys()) {
        blocks.push(trials.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return blocks;
};
exports.chunkTrials = chunkTrials;

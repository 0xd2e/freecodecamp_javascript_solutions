/*
 * PROJECT EULER
 * Problem 14: Longest Collatz sequence
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-14-longest-collatz-sequence
 *
 * https://en.wikipedia.org/wiki/Collatz_conjecture
 */


/* eslint-env node, amd */


const MEMO_CACHE = {};


function printCacheSize() {
    'use strict';

    const n = Object.keys(MEMO_CACHE).length;

    // eslint-disable-next-line no-console
    console.log(`(Longest Collatz sequence problem) Cache contains ${n.toLocaleString()} numbers`);
}


function prepopulate(cache) {
    'use strict';

    cache[3] = 8; //  [    3, 10, 5, 16, 8, 4, 2, 1]
    cache[5] = 6; //  [           5, 16, 8, 4, 2, 1]
    cache[6] = 9; //  [ 6, 3, 10, 5, 16, 8, 4, 2, 1]
    cache[10] = 7; // [       10, 5, 16, 8, 4, 2, 1]

    const limit = 1e6;
    let num = 2;
    let len = 2;

    // Update cache with consecutive powers of 2
    while (num <= limit) {
        cache[num] = len++;
        num <<= 1;
    }
}


function longestCollatzSequence(num) {
    'use strict';

    /*
     * Input:
     * num -- integer number greter than 2
     *     -- upper limit (exclusive) for a range of numbers to consider
     *
     * Retrun a positive integer (less than the given limit),
     * the number with the longest Collatz (hailstone) sequence.
     */

    const cache = MEMO_CACHE;
    let maxLength = 2;
    let maxNumber = 2;
    let startNumber = num - 1;
    let startNumSeqLength;

    if (cache[2] === undefined) {
        prepopulate(cache);
    }

    for (startNumber; startNumber > 2; --startNumber) {

        startNumSeqLength = 0;
        num = startNumber;

        while (!cache.hasOwnProperty(num)) {
            ++startNumSeqLength;
            num = num & 1 ? 3 * num + 1 : num /= 2;
        }

        startNumSeqLength += cache[num];

        // Update cache
        cache[startNumber] = startNumSeqLength;

        if (maxLength < startNumSeqLength) {
            maxLength = startNumSeqLength;
            maxNumber = startNumber;
        }
    }

    return maxNumber;
}


module.exports = {
    printCacheSize,
    longestCollatzSequence
};

/*
 * PROJECT EULER
 * Problem 14: Longest Collatz sequence
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-14-longest-collatz-sequence
 *
 * https://en.wikipedia.org/wiki/Collatz_conjecture
 */


/* eslint-env node, amd */


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

    const calcCollatzSequenceLength = (n) => {
        let seqLength = 0;
        while (n !== 1) {
            ++seqLength;
            n = n & 1 ? 3 * n + 1 : n /= 2;
        }
        return seqLength;
    };

    let maxLength = 2;
    let maxNumber = 2;
    let len;

    for (--num; num > 2; --num) {

        len = calcCollatzSequenceLength(num);

        if (maxLength < len) {
            maxLength = len;
            maxNumber = num;
        }
    }

    return maxNumber;
}


module.exports = {
    longestCollatzSequence
};

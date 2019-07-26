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

    let maxLength = 2;
    let maxNumber = 2;
    let startNumber = num - 1;
    let seqLength;

    for (startNumber; startNumber > 2; --startNumber) {

        seqLength = 0;
        num = startNumber;

        while (num !== 1) {
            ++seqLength;
            num = num & 1 ? 3 * num + 1 : num /= 2;
        }

        if (maxLength < seqLength) {
            maxLength = seqLength;
            maxNumber = startNumber;
        }
    }

    return maxNumber;
}


module.exports = {
    longestCollatzSequence
};

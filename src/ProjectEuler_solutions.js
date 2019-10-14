/*
 * PROJECT EULER
 *
 * Problem 1: Multiples of 3 and 5
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-1-multiples-of-3-and-5/
 *
 * Problem 6: Sum square difference
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-6-sum-square-difference/
 *
 * Problem 8: Largest product in a series
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-8-largest-product-in-a-series/
 *
 * Problem 9: Special Pythagorean triplet
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-9-special-pythagorean-triplet
 *
 * Problem 36: Double-base palindromes
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-36-double-base-palindromes/
 */


// Problem 1: Multiples of 3 and 5
/* exported multiplesOf3and5 */
function multiplesOf3and5(num) {
    'use strict';

    // Return the sum of all the multiples of 3 or 5 below the given number.

    num--; // to find the sum of all the multiples of 3 or 5 below this integer

    // Count the numbers of multiples of 3, 5, and 15
    const multi3 = Math.floor(num / 3);
    const multi5 = Math.floor(num / 5);
    const multi15 = Math.floor(num / 15);

    // Calculate sums of corresponding arithmetic sequences
    const multi3sum = Math.floor(((2 * 3 + (multi3 - 1) * 3) * multi3) / 2);
    const multi5sum = Math.floor(((2 * 5 + (multi5 - 1) * 5) * multi5) / 2);
    const multi15sum = Math.floor(((2 * 15 + (multi15 - 1) * 15) * multi15) / 2);

    return multi3sum + multi5sum - multi15sum;
}


// Problem 6: Sum square difference
/* exported sumSquareDifference */
function sumSquareDifference(n) {
    'use strict';

    const sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
    const squaredSum = ((n * (n + 1)) / 2) ** 2;

    return Math.abs(squaredSum - sumOfSquares);
}


// Problem 8: Largest product in a series
/* exported largestProductinaSeries */
function largestProductinaSeries(size) {
    'use strict';

    // eslint-disable-next-line comma-spacing, max-len
    const thousandDigits = new Uint8Array([7,3,1,6,7,1,7,6,5,3,1,3,3,0,6,2,4,9,1,9,2,2,5,1,1,9,6,7,4,4,2,6,5,7,4,7,4,2,3,5,5,3,4,9,1,9,4,9,3,4,9,6,9,8,3,5,2,0,3,1,2,7,7,4,5,0,6,3,2,6,2,3,9,5,7,8,3,1,8,0,1,6,9,8,4,8,0,1,8,6,9,4,7,8,8,5,1,8,4,3,8,5,8,6,1,5,6,0,7,8,9,1,1,2,9,4,9,4,9,5,4,5,9,5,0,1,7,3,7,9,5,8,3,3,1,9,5,2,8,5,3,2,0,8,8,0,5,5,1,1,1,2,5,4,0,6,9,8,7,4,7,1,5,8,5,2,3,8,6,3,0,5,0,7,1,5,6,9,3,2,9,0,9,6,3,2,9,5,2,2,7,4,4,3,0,4,3,5,5,7,6,6,8,9,6,6,4,8,9,5,0,4,4,5,2,4,4,5,2,3,1,6,1,7,3,1,8,5,6,4,0,3,0,9,8,7,1,1,1,2,1,7,2,2,3,8,3,1,1,3,6,2,2,2,9,8,9,3,4,2,3,3,8,0,3,0,8,1,3,5,3,3,6,2,7,6,6,1,4,2,8,2,8,0,6,4,4,4,4,8,6,6,4,5,2,3,8,7,4,9,3,0,3,5,8,9,0,7,2,9,6,2,9,0,4,9,1,5,6,0,4,4,0,7,7,2,3,9,0,7,1,3,8,1,0,5,1,5,8,5,9,3,0,7,9,6,0,8,6,6,7,0,1,7,2,4,2,7,1,2,1,8,8,3,9,9,8,7,9,7,9,0,8,7,9,2,2,7,4,9,2,1,9,0,1,6,9,9,7,2,0,8,8,8,0,9,3,7,7,6,6,5,7,2,7,3,3,3,0,0,1,0,5,3,3,6,7,8,8,1,2,2,0,2,3,5,4,2,1,8,0,9,7,5,1,2,5,4,5,4,0,5,9,4,7,5,2,2,4,3,5,2,5,8,4,9,0,7,7,1,1,6,7,0,5,5,6,0,1,3,6,0,4,8,3,9,5,8,6,4,4,6,7,0,6,3,2,4,4,1,5,7,2,2,1,5,5,3,9,7,5,3,6,9,7,8,1,7,9,7,7,8,4,6,1,7,4,0,6,4,9,5,5,1,4,9,2,9,0,8,6,2,5,6,9,3,2,1,9,7,8,4,6,8,6,2,2,4,8,2,8,3,9,7,2,2,4,1,3,7,5,6,5,7,0,5,6,0,5,7,4,9,0,2,6,1,4,0,7,9,7,2,9,6,8,6,5,2,4,1,4,5,3,5,1,0,0,4,7,4,8,2,1,6,6,3,7,0,4,8,4,4,0,3,1,9,9,8,9,0,0,0,8,8,9,5,2,4,3,4,5,0,6,5,8,5,4,1,2,2,7,5,8,8,6,6,6,8,8,1,1,6,4,2,7,1,7,1,4,7,9,9,2,4,4,4,2,9,2,8,2,3,0,8,6,3,4,6,5,6,7,4,8,1,3,9,1,9,1,2,3,1,6,2,8,2,4,5,8,6,1,7,8,6,6,4,5,8,3,5,9,1,2,4,5,6,6,5,2,9,4,7,6,5,4,5,6,8,2,8,4,8,9,1,2,8,8,3,1,4,2,6,0,7,6,9,0,0,4,2,2,4,2,1,9,0,2,2,6,7,1,0,5,5,6,2,6,3,2,1,1,1,1,1,0,9,3,7,0,5,4,4,2,1,7,5,0,6,9,4,1,6,5,8,9,6,0,4,0,8,0,7,1,9,8,4,0,3,8,5,0,9,6,2,4,5,5,4,4,4,3,6,2,9,8,1,2,3,0,9,8,7,8,7,9,9,2,7,2,4,4,2,8,4,9,0,9,1,8,8,8,4,5,8,0,1,5,6,1,6,6,0,9,7,9,1,9,1,3,3,8,7,5,4,9,9,2,0,0,5,2,4,0,6,3,6,8,9,9,1,2,5,6,0,7,1,7,6,0,6,0,5,8,8,6,1,1,6,4,6,7,1,0,9,4,0,5,0,7,7,5,4,1,0,0,2,2,5,6,9,8,3,1,5,5,2,0,0,0,5,5,9,3,5,7,2,9,7,2,5,7,1,6,3,6,2,6,9,5,6,1,8,8,2,6,7,0,4,2,8,2,5,2,4,8,3,6,0,0,8,2,3,2,5,7,5,3,0,4,2,0,7,5,2,9,6,3,4,5,0]);

    const lastArrIndex = thousandDigits.length - size;
    const lastFrameIndex = size - 1;

    let i = thousandDigits.slice(0, size).lastIndexOf(0);
    let curProd = 0;
    let bigProd = 0;

    let frame;

    i = i < 0 ? 0 : i + 1;

    for (i; i < lastArrIndex; i++) {

        frame = thousandDigits.slice(i, i + size);

        // Look for zero only at the end of a frame, just by chance
        if (frame[lastFrameIndex] === 0) {
            // Take account of the loop incrementing i with an iteration
            i += lastFrameIndex;
            continue;
        }

        curProd = frame.reduce((acc, cur) => acc * cur, 1);

        if (bigProd < curProd) bigProd = curProd;
    }

    return bigProd;
}


// Problem 9: Special Pythagorean triplet
/* exported specialPythagoreanTriplet */
function specialPythagoreanTriplet(num) {
    'use strict';

    // Equations are based on: https://en.wikipedia.org/wiki/Pythagorean_triple#Generating_a_triple

    let a = 0;
    let b = 0;
    let c = 0;

    // eslint-disable-next-line one-var, one-var-declaration-per-line
    let m, n, mm, nn, answer;

    for (m = 1; m < num; m++) {

        n = parseInt(num / (2 * m) - m);

        if (n < 0) break;

        mm = m * m;
        nn = n * n;
        a = mm - nn;
        b = 2 * m * n;
        c = mm + nn;

        answer = a > 0 && a * a + b * b === c * c && a + b + c === num;

        if (answer) break;
    }

    return answer ? a * b * c : 0;
}


// Problem 36: Double-base palindromes
function createPalindrome(num, base, oddDigits) {
    'use strict';

    /*
     * Inputs:
     * num -- positive integer number
     * base -- integer greater than 2, base (radix) of a number system
     * oddDigits -- boolean, should palindrome have an odd number of digits
     *
     * Return a number that is a palindrome in the given base
     * created from the given number.
     *
     * This algorithm is entirely based on:
     * https://www.mathblog.dk/project-euler-36-palindromic-base-10-2/
     */

    let palindrome = num;

    // If the palindrome should have an odd number of digits, neglect the last
    // digit of the input number because middle element occurs once
    if (oddDigits) {
        num = (num / base) >> 0;
    }

    // Creates palindrome by appending reverse of the number to itself
    while (num > 0) {
        palindrome = palindrome * base + (num % base);
        num = (num / base) >> 0;
    }

    return palindrome;
}


function isPalindrome(num, base) {
    'use strict';

    /*
     * Inputs:
     * num -- positive integer number
     * base -- integer greater than 2, base (radix) of a number system
     *
     * Return true if the given number is a palindrome in the given base,
     * false otherwise.
     *
     * This algorithm is entirely based on:
     * https://www.mathblog.dk/project-euler-36-palindromic-base-10-2/
     */

    const original = num;
    let reversed = 0;

    while (num > 0) {
        reversed = reversed * base + (num % base);
        num = (num / base) >> 0;
    }

    return original === reversed;
}


/* exported doubleBasePalindromes */
function doubleBasePalindromes(num) {
    'use strict';

    // This algorithm is entirely based on:
    // https://www.mathblog.dk/project-euler-36-palindromic-base-10-2/

    // Palindromic numbers have a structure such that they
    // can be constructed without missing any of them.

    const limit = num;
    let sum = 0;
    let i;

    for (const isOdd of [true, false]) {
        i = 1;
        do {
            num = createPalindrome(i++, 10, isOdd);
            if (isPalindrome(num, 2)) {
                sum += num;
            }
        } while (num < limit);
    }

    return sum;
}

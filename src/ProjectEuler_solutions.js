'use strict';

/*
 * PROJECT EULER
 *
 * Problem 1: Multiples of 3 and 5
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-1-multiples-of-3-and-5/
 *
 * Problem 2: Even Fibonacci Numbers
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-2-even-fibonacci-numbers
 *
 * Problem 5: Smallest multiple
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-5-smallest-multiple
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
 * Problem 11: Largest product in a grid
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-11-largest-product-in-a-grid
 *
 * Problem 13: Large sum
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-13-large-sum
 *
 * Problem 18: Maximum path sum I
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-18-maximum-path-sum-i
 *
 * Problem 19: Counting Sundays
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-19-counting-sundays
 *
 * Problem 20: Factorial digit sum
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-20-factorial-digit-sum
 *
 * Problem 34: Digit factorials
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-34-digit-factorials
 *
 * Problem 36: Double-base palindromes
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-36-double-base-palindromes/
 *
 * Problem 40: Champernowne's constant
 * https://learn.freecodecamp.org/coding-interview-prep/project-euler/problem-40-champernownes-constant/
 *
 * Problem 81: Path sum: two ways
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-81-path-sum-two-ways
 *
 * Problem 83: Path sum: four ways
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-83-path-sum-four-ways
 *
 * Problem 144: Investigating multiple reflections of a laser beam
 * https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-144-investigating-multiple-reflections-of-a-laser-beam
 */


// Problem 1: Multiples of 3 and 5
/* exported multiplesOf3and5 */
function multiplesOf3and5(num) {

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


// Problem 2: Even Fibonacci Numbers
/* exported fiboEvenSum */
function fiboEvenSum(n) {

    /*
     * Every third number in The Fibonacci Sequence is even:
     * 1, 1, (2), 3, 5, (8), 13, 21, (34), 55, 89, (144), 233, 377, (610), ...
     *
     * Reminder - sum of two numbers is even when: both numbers are odd or both numbers are even.
     *
     * Subsequence with only even numbers:
     * Sub[1] = Fib[ 3] =   2
     * Sub[2] = Fib[ 6] =   8
     * Sub[3] = Fib[ 9] =  34 = 4 * Fib[ 6] + Fib[ 3]
     * Sub[4] = Fib[12] = 144 = 4 * Fib[ 9] + Fib[ 6]
     * Sub[5] = Fib[15] = 610 = 4 * Fib[12] + Fib[ 9]
     *
     * Recursive formula for even Fibonacci Numbers:
     * Sub[i] = 4 * Sub[i - 1] + Sub[i - 2], for i = 3, 4, 5, ...
     */

    const limit = n;
    let sum = 0;
    let m = 2;
    n = 8;

    while (n <= limit) {
        sum += m;
        [n, m] = [4 * n + m, n];
    }

    return sum + m;
}


// Problem 5: Smallest multiple
/* exported smallestMult */
function smallestMult(n) {

    let leastCommonMultiple = n;
    let factor = n - 1;

    for (factor; factor > 1; --factor) {
        n = leastCommonMultiple;
        while (leastCommonMultiple % factor) {
            leastCommonMultiple += n;
        }
    }

    return leastCommonMultiple;
}


// Problem 6: Sum square difference
/* exported sumSquareDifference */
function sumSquareDifference(n) {
    const sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
    const squaredSum = ((n * (n + 1)) / 2) ** 2;
    return Math.abs(squaredSum - sumOfSquares);
}


// Problem 8: Largest product in a series
/* exported largestProductinaSeries */
function largestProductinaSeries(size) {

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


// Problem 11: Largest product in a grid
/* exported largestGridProduct */
function largestGridProduct(arr) {

    let greatest = 0;
    let row = 0;
    let col;

    const windowSize = 4;
    const maxIndexOffset = windowSize - 1;
    const end = arr.length - windowSize;
    const offsets = new Int8Array(windowSize).fill().map((_, i) => i);
    const multiplyVertically = (prod, n) => prod * n;
    const multiplyHorizontally = (prod, i) => prod * arr[row][col + i];
    const multiplyDiagonally = (prod, i) => prod * arr[row + i][col + i];
    const multiplyAntidiagonally = (prod, i) => prod * arr[row + maxIndexOffset - i][col + i];

    for (row; row <= end; ++row) {
        for (col = 0; col <= end; ++col) {
            greatest = Math.max(
                arr[row].slice(col, col + windowSize).reduce(multiplyVertically, 1),
                offsets.reduce(multiplyHorizontally, 1),
                offsets.reduce(multiplyDiagonally, 1),
                offsets.reduce(multiplyAntidiagonally, 1),
                greatest
            );
        }
    }

    return greatest;
}


// Problem 13: Large sum
/* exported largeSum */
function largeSum(numStrArr) {

    const numStrLength = numStrArr[0].length;
    const arrGrowthFactor = Math.ceil(Math.log10(numStrArr.length));
    const result = new Uint16Array(numStrLength + arrGrowthFactor);
    result.fill(0);

    let resultPos = result.length;
    let numStr;
    let sum;
    let i;

    for (i = numStrLength - 1; i >= 0; --i) {

        sum = 0;

        for (numStr of numStrArr) {
            sum += numStr[i] >> 0;
        }

        result[--resultPos] = sum;
    }

    for (i = result.length - 1; i > 0; --i) {
        result[i - 1] += (result[i] / 10) >> 0;
        result[i] %= 10;
    }

    i = result[0] > 0 ? 0 : 1;
    return parseInt(result.slice(i, i + 10).join(''));
}


// Problem 18: Maximum path sum I
/* exported maximumPathSumI */
function maximumPathSumI(triangle) {

    /*
     * triangle | level
     *     1    |     0
     *    2 3   |     1
     *   4 5 6  |     2
     *
     * Terms that are used interchangeably: level/row, path/route, triangle/pyramid.
     * Each step in this bottom-up approach is a binary decision: false (left), true (right).
     */

    let lvl = triangle.length - 2; // second-to-last row index
    const totals = Uint16Array.from(triangle[lvl + 1]);
    let i;

    for (lvl; lvl >= 0; --lvl) {
        for (i = 0; i <= lvl; ++i) {
            if (totals[i] < totals[i + 1]) {
                totals[i] = totals[i + 1] + triangle[lvl][i];
            } else {
                totals[i] += triangle[lvl][i];
            }
        }
    }

    return totals[0];
}


// Problem 19: Counting Sundays
/* exported countingSundays */
function countingSundays(firstYear, lastYear) {

    // Plain and simple brute force solution

    const d = new Date(firstYear, 0, 1);
    let sundays = 0;

    while (d.getFullYear() <= lastYear) {
        if (d.getDay() === 0) ++sundays;
        d.setMonth(d.getMonth() + 1);
    }

    return sundays;
}


// Problem 20: Factorial digit sum
/* exported sumFactorialDigits */
function sumFactorialDigits(n) {

    if (n === 0) return 1;
    if (n < 3) return n;

    let factorial = BigInt(n);
    let i = BigInt(n - 1);

    for (i; i > 1n; --i) {
        factorial *= i;
        while (!(factorial % 10n)) factorial /= 10n; // truncate trailing zeros
    }

    return Uint8Array.from(factorial.toString())
        .reduce((sum, dig) => sum + dig, 0);
}


// Problem 34: Digit factorials
const digitsFactorialCache = Uint32Array.from('0123456789').map((n) => {

    // Calculate the factorial of the given (index) digit

    if (n === 0) return 1;
    if (n < 3) return n;

    let product = 2;

    for (n; n > 2; --n) {
        product *= n;
    }

    return product;
});


/* exported digitFactorial */
function digitFactorial() {

    const limit = 500000;
    const numbers = [];
    let sum = 0;
    let num = 3;

    // Auxiliary variables
    let digitsFactorialSum;
    let currNum;

    for (num; num < limit; ++num) {
        currNum = num;
        digitsFactorialSum = 0;
        while (currNum > 0) {
            digitsFactorialSum += digitsFactorialCache[currNum % 10];
            currNum = (currNum / 10) >> 0;
        }
        if (num === digitsFactorialSum) {
            sum += num;
            numbers.push(num);
        }
    }

    return { sum, numbers };
}


// Problem 36: Double-base palindromes
function createPalindrome(num, base, oddDigits) {

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


// Problem 40: Champernowne's constant
function getDigits(n) {

    /*
     * Input:
     * n -- positive integer number
     *   -- index of a digit in the sequence
     *   -- must be a power of 10
     *
     * Returns an integer, a single digit at the given position in the sequence.
     *
     * This algorithm is entirely based on:
     * https://www.xarg.org/puzzle/project-euler/problem-40/
     *
     * Notes:
     * - "sequence" is created by concatenating consecutive positive integers (A007376 in the OEIS)
     * - "block" is a chunk of the sequence based on a number of digits in a number
     * - index of the current block corresponds to the number of digits in each number in the block
     */

    let f; // total amount of numbers until and including the first number of the current block
    let r; // index upper bound of the previous block, total amount of digits until the current block
    let k = 0; // index of the current block, number of digits each number has in the current block
    let s = 0; // index upper bound of the current block, total amount of digits until next block

    while (s < n) {
        r = s;
        f = 10 ** k++;
        s += 9 * f * k;
    }

    const h = n - r - 1;
    const t = f + h / k; // number in the sequence that contains requested digit
    const p = h % k; // position of the digit in the number

    return +t.toString()[p];
}


/* exported champernownesConstant */
function champernownesConstant(n) {

    // Based on: https://www.xarg.org/puzzle/project-euler/problem-40/

    let answer = 1;

    for (n; n >= 1; n /= 10) {
        answer *= getDigits(n);
    }

    return answer;
}


// Problem 81: Path sum: two ways
function enqueue(minPriorityQueue, newItem) {

    /*
     * Inputs:
     *
     * minPriorityQueue
     * -- nested array of integer numbers
     * -- must be sorted in ascending order according to the first element in subarray
     * -- subarrays cannot be empty
     *
     * newItem -- nonempty array of intiger numbers
     *
     *
     * Add new subarray to the nested array at the position that will preserve sorting order.
     *
     *
     * Used in Project Euler - Problems 81 and 83
     *
     * Based on:
     * https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure_for_finding_the_leftmost_element
     */

    const newItemComparisonKey = newItem[0];
    let left = 0;
    let right = minPriorityQueue.length - 1;

    if (right < 0 || minPriorityQueue[right][0] < newItemComparisonKey) {
        minPriorityQueue.push(newItem);
        return;
    }

    if (minPriorityQueue[left][0] >= newItemComparisonKey) {
        minPriorityQueue.unshift(newItem);
        return;
    }

    let middle;

    while (left < right) {
        middle = (left + right) >>> 1;
        if (minPriorityQueue[middle][0] < newItemComparisonKey) {
            left = middle + 1;
        } else {
            right = middle;
        }
    }

    minPriorityQueue.splice(left, 0, newItem);
}


/* exported pathSumTwoWays */
function pathSumTwoWays(squareMatrix) {

    /*
     * Inputs:
     *
     * squareMatrix
     * -- nested (2d) array of integer numbers
     * -- each subarray must have the same length as the container array
     * (number of integers in each subarray must be equal to the number of subarrays in the matrix)
     *
     *
     * Return an integer number, the lowest sum of all numbers along a path
     * from the top left corner to the bottom right corner on a square grid.
     * Both start (source) and end (destination) cells count to the total cost.
     *
     *
     * Notes:
     *
     * -- Right and down steps are allowed. Therefore only moving forward
     * (toward the target cell) is possible and length of each feasible
     * path is constant (all routes have the same number of steps).
     *
     * -- Each cell of the grid represents the cost of traversing through that cell.
     *
     * -- There is no need to backtrack the path (reconstruct the steps),
     * because only the total cost of the path is required.
     *
     * -- This solution is based on Dijkstra’s shortest path algorithm.
     */

    const len = squareMatrix.length;
    const end = len - 1;

    // Auxiliary variables for value and position of a cell
    // eslint-disable-next-line one-var, one-var-declaration-per-line
    let cost, row, col;

    /*
     * Minimum priority queue:
     * -- holds accumulated cost and position of cells that are not yet evaluated
     * -- is an array of arrays of integers sorted in ascending order by the accumulated cost
     * -- guarantees that the first time a cell is visited (dequeued) it is the end point
     * of a path with the lowest cost to get to that cell
     *
     * Structure of subarrays:
     * 0. sum of all values from cells on the path
     * 1. row index of the end point
     * 2. column index of the end point
     */
    const minPriorityQueue = [
        [squareMatrix[0][0], 0, 0]
    ];

    const visited = [];
    for (row = 0; row < len; ++row) {
        visited.push(new Int8Array(len));
        visited[row].fill(0);
    }

    while (minPriorityQueue.length) {
        [cost, row, col] = minPriorityQueue.shift(); // dequeue
        if (visited[row][col]) continue;
        if (row === end && col === end) break;
        if (row < end) {
            enqueue(minPriorityQueue, [cost + squareMatrix[row + 1][col], row + 1, col]);
        }
        if (col < end) {
            enqueue(minPriorityQueue, [cost + squareMatrix[row][col + 1], row, col + 1]);
        }
        visited[row][col] = 1;
    }

    return cost;
}


// Problem 83: Path sum: four ways
/* exported pathSumFourWays */
function pathSumFourWays(squareMatrix) {

    /*
     * Inputs:
     *
     * squareMatrix
     * -- nested (2d) array of integer numbers
     * -- each subarray must have the same length as the container array
     * (number of integers in each subarray must be equal to the number of subarrays in the matrix)
     *
     *
     * Return an integer number, the lowest sum of all numbers along a path
     * from the top left corner to the bottom right corner on a square grid.
     * Both start (source) and end (destination) cells count to the total cost.
     *
     *
     * Notes:
     *
     * -- Allowed steps: left, up, right, and down.
     *
     * -- Each cell of the grid represents the cost of traversing through that cell.
     *
     * -- There is no need to backtrack the path (reconstruct the steps),
     * because only the total cost of the path is required.
     *
     * -- This solution is based on Dijkstra’s shortest path algorithm.
     */

    const len = squareMatrix.length;
    const end = len - 1;

    // Auxiliary variable for position of neighbors of the current cell
    const neighbors = [];

    // Auxiliary variables for value and position of a cell
    // eslint-disable-next-line one-var, one-var-declaration-per-line
    let cost, row, col;

    /*
     * Minimum priority queue:
     * -- holds accumulated cost and position of cells that are not yet evaluated
     * -- is an array of arrays of integers sorted in ascending order by the accumulated cost
     * -- ensures that each discovered (dequeued) cell is the end point
     * of a path with the lowest cost to get to that cell
     *
     * Structure of subarrays:
     * 0. sum of all values from cells on the path
     * 1. row index of the end point
     * 2. column index of the end point
     */
    const minPriorityQueue = [
        [squareMatrix[0][0], 0, 0]
    ];

    const discovered = [];
    for (row = 0; row < len; ++row) {
        discovered.push(new Int8Array(len));
        discovered[row].fill(0);
    }

    discovered[0][0] = 1;

    while (minPriorityQueue.length) {
        [cost, row, col] = minPriorityQueue.shift(); // dequeue
        if (row === end && col === end) break;
        // Neighbors inside the grid (possible next steps)
        if (row > 0) neighbors.push([row - 1, col]);
        if (col > 0) neighbors.push([row, col - 1]);
        if (row < end) neighbors.push([row + 1, col]);
        if (col < end) neighbors.push([row, col + 1]);
        while (neighbors.length) {
            [row, col] = neighbors.pop();
            if (discovered[row][col]) continue;
            enqueue(minPriorityQueue, [cost + squareMatrix[row][col], row, col]);
            discovered[row][col] = 1;
        }
    }

    return cost;
}


// Problem 144: Investigating multiple reflections of a laser beam
/* exported euler144 */
function euler144() {

    /*
     * Notes:
     *
     * In this particular case (for the ellipse and initial conditions)
     * none of incidence points have either of their coordinates equal to zero.
     * Consequently all axes of symmetry are neither vertical nor horizontal.
     *
     * A laser beam can enter and exit the white cell through a single hole at the top.
     *
     * The point of incidence is common for the ellipse, incident line,
     * reflected line, and axis of symmetry.
     *
     * All points of incidence lie on the ellipse. Furthermore, two
     * consecutive points of incidence lie on the same line.
     *
     * Coordinates of a point of incidence are calculated using:
     * -- equation of the ellipse for two consecutive points of incidence
     *    4 * x ^ 2 + y ^ 2 = 4 * x0 ^ 2 + y0 ^ 2 = 100
     * -- slope of a non-vertical incident line
     *    m1 = (y - y0) / (x - x0)
     * -- equation of the incident line
     *    y = m1 * x + c1
     *
     * Another possible approach to find a point of incidence
     * is to calculate intersection of a line and ellipse
     * -- equation of the ellipse
     *    4 * x ^ 2 + y ^ 2 = 100
     * -- equation of a non-vertical incident line
     *    y = m1 * x + c1
     */

    // Coordinates of a point on the (initial) incident line
    let x1 = 0.0;
    let y1 = 10.1;

    // Coordinates of the point of incidence
    let x0 = 1.4;
    let y0 = -9.6;

    let internalReflectionCounter = 0;

    // eslint-disable-next-line one-var, one-var-declaration-per-line
    let m, ms, cs, x, m1, c1;

    while (x0 < -0.01 || x0 > 0.01 || y0 < 0) {

        // Slope of the line tangent to the ellipse at the point of incidence
        m = -4 * x0 / y0;

        // Coefficients of the axis of symmetry
        ms = -1 / m; // it is normal (perpendicular) to the tangent line
        cs = y0 - ms * x0; // it passes through the point of incidence

        // Coordinate of the midpoint - the point of intersection of the axis of symmetry
        // and a normal (perpendicular) line that passes through [x1, y1] point
        x = (y1 - m * x1 - cs) / (ms - m);
        // Secont coordinate: y = ms * x + cs = m * x + (y1 - m * x1)

        // Now consider the reflected laser beam as the new incident beam

        // Coordinates of a point on the new incident line which is a reflection over the axis of symmetry
        x1 = 2 * x - x1;
        y1 = 2 * (ms * x + cs) - y1;

        // Coefficients of the new incident line
        m1 = (y1 - y0) / (x1 - x0);
        c1 = y1 - m1 * x1;

        // Coordinates of the new point of incidence
        x0 = ((m1 * m1 - 4) * x0 - 2 * m1 * y0) / (4 + m1 * m1);
        y0 = m1 * x0 + c1;

        ++internalReflectionCounter;
    }

    return internalReflectionCounter;
}

'use strict';

/*
 * ROSETTA CODE
 *
 * 100 doors
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/100-doors/
 *
 * Accumulator factory
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/accumulator-factory/
 *
 * Ackermann function
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/ackermann-function/
 *
 * Averages/Mode
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/averagesmode/
 *
 * Averages/Pythagorean means
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/averagespythagorean-means
 *
 * Averages/Root mean square
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/averagesroot-mean-square/
 *
 * Balanced brackets
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/balanced-brackets
 *
 * Circles of given radius through two points
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/circles-of-given-radius-through-two-points/
 *
 * Combinations
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/combinations
 *
 * Comma quibbling
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/comma-quibbling/
 *
 * Compare a list of strings
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/compare-a-list-of-strings/
 *
 * Convert seconds to compound duration
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/convert-seconds-to-compound-duration
 *
 * Cumulative standard deviation
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/cumulative-standard-deviation
 *
 * CUSIP
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/cusip
 *
 * Date format
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/date-format/
 *
 * Day of the week
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/day-of-the-week/
 *
 * Dot product
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/dot-product
 *
 * Element-wise operations
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/element-wise-operations/
 *
 * Entropy
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/entropy/
 *
 * Evaluate binomial coefficients
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/evaluate-binomial-coefficients/
 *
 * Factors of an integer
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/factors-of-an-integer/
 *
 * Fibonacci sequence
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/fibonacci-sequence/
 *
 * Fibonacci word
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/fibonacci-word
 *
 * Gamma function
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/gamma-function
 *
 * Gray code
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/gray-code/
 *
 * Greatest common divisor
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/greatest-common-divisor/
 *
 * Harshad or Niven series
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/harshad-or-niven-series/
 *
 * Hash from two arrays
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/hash-from-two-arrays/
 *
 * Hofstadter Q sequence
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/hofstadter-q-sequence/
 */


/* eslint key-spacing: ["error", { "align": "colon" }] */


// 100 doors
/* exported getFinalOpenedDoors */
function getFinalOpenedDoors(numDoors) {

    // Doors are numbered starting from 1.
    // Positive number indicates that a door is opened.
    // Negative number indicates that a door is closed.

    // 1st pass through will open all doors
    const doors = (new Array(numDoors)).fill(0).map((cur, pos) => pos + 1);
    const numPasses = (numDoors < 100) ? numDoors : 100;

    let i = 2;
    let j;

    for (i; i <= numPasses; i++) {
        for (j = i - 1; j < numDoors; j += i) {
            doors[j] *= -1;
        }
    }

    return doors.filter((num) => num > 0);
}


// Accumulator factory
/* exported accumulator */
function accumulator(sum) {
    return (num) => {
        sum += num;
        return sum;
    };
}


// Ackermann function
/* exported ack */
function ack(m, n) {
    // Assumption: m and n are natural numbers (non-negative integers)
    if (m === 0) return n + 1;
    if (n === 0) return ack(m - 1, 1);
    return ack(m - 1, ack(m, n - 1));
}


// Averages/Mode
/* exported mode */
function mode(arr) {

    const counts = {};

    for (const num of arr) {
        counts[num] = counts[num] + 1 || 1;
    }

    const max = Math.max(...Object.values(counts));

    return Object.keys(counts)
        .filter((key) => counts[key] === max)
        .map((key) => key >> 0);
}


// Averages/Pythagorean means
/* exported pythagoreanMeans */
function pythagoreanMeans(rangeArr) {

    const n = rangeArr.length;
    const sum = rangeArr.reduce((total, num) => total + num, 0);
    const product = rangeArr.reduce((prod, num) => prod * num, 1);
    const sumReciprocal = rangeArr.reduce((total, num) => total + 1 / num, 0);

    const means = {
        Arithmetic: sum / n,
        Geometric : product ** (1 / n),
        Harmonic  : n / sumReciprocal
    };

    const test = means.Arithmetic >= means.Geometric && means.Geometric >= means.Harmonic;

    return {
        values: means,
        test  : `is A >= G >= H ? ${test ? 'yes' : 'no'}`
    };
}


// Averages/Root mean square
/* exported rms */
function rms(arr) {
    // Return Root Mean Square of numbers in the given array.
    const sumSquares = arr.reduce((sum, num) => sum + num * num, 0);
    return Math.sqrt(sumSquares / arr.length);
}


// Balanced brackets
/* exported isBalanced */
function isBalanced(str) {

    const bracketsCount = {
        ']': 0,
        ')': 0,
        '}': 0,
        '>': 0
    };

    const bracketsPart = {
        '[': ']', // square brackets
        '(': ')', // parentheses
        '{': '}', // curly brackets
        '<': '>' // anglee brackets
    };

    for (const char of str) {
        if (bracketsCount.hasOwnProperty(char) && --bracketsCount[char] < 0) return false;
        if (bracketsPart.hasOwnProperty(char)) ++bracketsCount[bracketsPart[char]];
    }

    return Object.values(bracketsCount).reduce((sum, num) => sum + num, 0) === 0;
}


// Circles of given radius through two points
/* exported getCircles */
function getCircles(...args) {

    // Based on: http://mathforum.org/library/drmath/view/53027.html

    const epsilon = 7;
    const [x1, y1] = args[0];
    const [x2, y2] = args[1];
    const diameter = args[2] * 2;

    if (diameter === 0) {
        return 'Radius Zero';
    }

    if (x1.toPrecision(epsilon) === x2.toPrecision(epsilon)
        && y1.toPrecision(epsilon) === y2.toPrecision(epsilon)) {
        return 'Coincident point. Infinite solutions';
    }

    const distance = Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));

    if (distance > diameter) {
        return 'No intersection. Points further apart than circle diameter';
    }

    // Midpoint of the distance between the two given points
    const x3 = (x1 + x2) / 2;
    const y3 = (y1 + y2) / 2;

    // Check if the center of the circle is exactly halfway between the two given points
    if (distance.toPrecision(epsilon) === diameter.toPrecision(epsilon)) {
        return [x3, y3];
    }

    // Direction of the line perpendicular to the distance between
    // the two given points normalized by distance length
    const uvecx = (y1 - y2) / distance;
    const uvecy = (x2 - x1) / distance;

    const dist = Math.sqrt(((diameter / 2) ** 2) - ((distance / 2) ** 2));

    // Loci of the centers of the circles
    const centers = [
        [x3 + dist * uvecx, y3 + dist * uvecy],
        [x3 - dist * uvecx, y3 - dist * uvecy]
    ];

    return centers.map((xy) => [
        +(Math.round(xy[0] + 'e+4') + 'e-4'), // eslint-disable-line prefer-template
        +(Math.round(xy[1] + 'e+4') + 'e-4') // eslint-disable-line prefer-template
    ]);
}


// Combinations
function calcRangeProd(n, k) {

    /*
     * Inputs:
     * n, k -- integer numbers, n >= k
     *
     * Return an integer, result of multiplications of consecutive
     * integers from k to n (both ends included).
     */

    const lim = n;

    for (k; k < lim; ++k) {
        n *= k;
    }

    return n;
}


function calcBinomialCoeff(n, k) {

    /*
     * Inputs:
     * n, k -- positive integer numbers, n >= k

     * Return an integer, total number of combinations without repetition.
     */

    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k === 1 || n - k === 1) return n;
    return Math.round(calcRangeProd(n, k + 1) / calcRangeProd(n - k, 2));
}


/* exported combinations */
function combinations(m, n) {

    if (m === 1) {
        return Array.from({ length: n }, (_, i) => [i]);
    }

    const subset = Uint8Array.from(Array(m).keys());
    const sortedSubsets = [];
    sortedSubsets.push([...subset]);

    if (m === n) {
        return sortedSubsets;
    }

    const size = calcBinomialCoeff(n, m);
    const leftmostLim = n - m;
    const rightmostLim = n - 1;
    const subsetLastIndex = m - 1;
    const finalSubset = Uint8Array.from({ length: m }, (_, i) => leftmostLim + i);
    let i;

    while (sortedSubsets.length < size) {

        while (++subset[subsetLastIndex] <= rightmostLim) {
            sortedSubsets.push([...subset]);
        }

        i = subsetLastIndex - 1;
        while (subset[i] === finalSubset[i]) --i;

        ++subset[i];

        for (i; i < subsetLastIndex; ++i) {
            subset[i + 1] = subset[i] + 1;
        }

        sortedSubsets.push([...subset]);
    }

    return sortedSubsets;
}


// Comma quibbling
/* exported quibble */
function quibble(words) {

    switch (words.length) {
    case 0: return '{}';
    case 1: return `{${words[0]}}`;
    // no default
    }

    const text = words.join(',');
    const lastCommaPosition = text.lastIndexOf(',');

    return `{${text.slice(0, lastCommaPosition)} and ${words[words.length - 1]}}`;
}


// Compare a list of strings
/* exported allEqual */
function allEqual(arr) {

    switch (arr.length) {
    case 0: return true;
    case 1: return true;
    // no default
    }

    const value = arr[0];
    return arr.every((currVal) => currVal === value);
}


/* exported azSorted */
function azSorted(arr) {

    switch (arr.length) {
    case 0: return true;
    case 1: return true;
    // no default
    }

    let prevVal = '';
    let currVal;

    for (currVal of arr) {
        if (currVal <= prevVal) {
            return false;
        }
        prevVal = currVal;
    }

    return true;
}


// Convert seconds to compound duration
/* exported convertSeconds */
function convertSeconds(seconds) {

    const units = [
        'wk',
        'd',
        'hr',
        'min'
    ];

    const conversionFactors = [
        604800, // seconds in a week
        86400, // seconds in a day
        3600, // seconds in an hour
        60 // seconds in a minute
    ];

    const compoundDuration = [];

    conversionFactors.forEach((cf, i) => {
        const qty = Math.floor(seconds / cf);
        if (qty > 0) {
            seconds -= qty * cf;
            compoundDuration.push(`${qty} ${units[i]}`);
        }
    });

    if (seconds > 0) {
        compoundDuration.push(`${seconds} sec`);
    }

    return compoundDuration.join(', ');
}


// Cumulative standard deviation
/* exported standardDeviation */
function standardDeviation(arr) {
    const mean = arr.reduce((sum, num) => sum + num, 0) / arr.length;
    const variance = arr.reduce((sum, num) => sum + (num - mean) ** 2, 0) / arr.length;
    // Standard deviation for a population, rounded to 3 decimal places
    return Math.round(Math.sqrt(variance) * 1000) / 1000;
}


// CUSIP
/* exported isCusip */
function isCusip(str) {

    // Based on: https://en.wikipedia.org/wiki/CUSIP#Check_digit_pseudocode

    if (str.length !== 9) return false;

    str = str.toUpperCase();

    const valuesTable = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'A': 10,
        'B': 11,
        'C': 12,
        'D': 13,
        'E': 14,
        'F': 15,
        'G': 16,
        'H': 17,
        'I': 18,
        'J': 19,
        'K': 20,
        'L': 21,
        'M': 22,
        'N': 23,
        'O': 24,
        'P': 25,
        'Q': 26,
        'R': 27,
        'S': 28,
        'T': 29,
        'U': 30,
        'V': 31,
        'W': 32,
        'X': 33,
        'Y': 34,
        'Z': 35,
        '*': 36,
        '@': 37,
        '#': 38
    };

    let char;
    let value;
    let sum = 0;
    let i = 1;

    for (i; i < 9; ++i) {
        char = str[i - 1];
        if (!valuesTable.hasOwnProperty(char)) return false;
        value = valuesTable[char];
        if ((i & 1) === 0) value *= 2; // double the value at even position
        sum += Math.floor(value / 10) + (value % 10);
    }

    sum = (10 - (sum % 10)) % 10;
    value = parseInt(str[8]);

    return sum === value;
}

// Date format
/* exported getDateFormats */
function getDateFormats() {

    const now = new Date();
    const loc = 'en-US';
    const short = [
        now.toLocaleDateString(loc, { year: 'numeric' }),
        now.toLocaleDateString(loc, { month: 'numeric' }),
        now.toLocaleDateString(loc, { day: 'numeric' })
    ];
    const long = {
        weekday: now.toLocaleDateString(loc, { weekday: 'long' }),
        month  : now.toLocaleDateString(loc, { month: 'long' }),
        day    : now.toLocaleDateString(loc, { day: 'numeric' }),
        year   : now.toLocaleDateString(loc, { year: 'numeric' })
    };

    return [
        short.join('-'),
        `${long.weekday}, ${long.month} ${long.day}, ${long.year}`
    ];
}


// Day of the week
/* exported findXmasSunday */
function findXmasSunday(start, end) {

    const date = new Date(start, 11, 25);
    const xmasSundayYears = [];

    for (start; start <= end; start++) {
        date.setFullYear(start);

        // Check if the 25th of December is a Sunday
        if (date.getDay() === 0) {
            xmasSundayYears.push(start);
        }
    }

    return xmasSundayYears;
}


// Dot product
/* exported dotProduct */
function dotProduct(arr1, arr2) {

    const n = arr1.length;

    if (n !== arr2.length) return NaN;

    let sum = 0;
    let i = 0;

    for (i; i < n; ++i) {
        sum += arr1[i] * arr2[i];
    }

    return sum;
}


// Element-wise operations
/* exported operation */
function operation(op, arr1, otherArg) {

    // Assume that arr1 (always) and arg2 (if it is not a number)
    // are valid matrixes. The valid matrix is a 2d array of numbers
    // where every sub-array has the same size.

    // There is no check for division by zero,
    // which gives +/- Infinity as a result in JavaScript.

    // Check if two matrixes have the same size
    const checkSize = (m1, m2) => m1.length === m2.length
        && m1.every((vec, i) => vec.length === m2[i].length);

    let arr2;
    let num;

    const validOperations = {
        m_add : (vec, i) => vec.map((val, j) => val + arr2[i][j]),
        m_sub : (vec, i) => vec.map((val, j) => val - arr2[i][j]),
        m_mult: (vec, i) => vec.map((val, j) => val * arr2[i][j]),
        m_div : (vec, i) => vec.map((val, j) => val / arr2[i][j]),
        m_exp : (vec, i) => vec.map((val, j) => val ** arr2[i][j]),
        s_add : (vec) => vec.map((val) => val + num),
        s_sub : (vec) => vec.map((val) => val - num),
        s_mult: (vec) => vec.map((val) => val * num),
        s_div : (vec) => vec.map((val) => val / num),
        s_exp : (vec) => vec.map((val) => val ** num)
    };

    if (validOperations.hasOwnProperty(op)) {
        // Check if arr1 and otherArg match to op
        if (op.startsWith('m') && Array.isArray(otherArg) && checkSize(arr1, otherArg)) {
            arr2 = otherArg; // for matrix-matrix operation
        } else if (typeof otherArg === 'number') {
            // An array with only one number is considered incorrect
            num = otherArg; // for scalar-matrix operation
        }
        if (arr2 !== undefined || num !== undefined) {
            return arr1.map(validOperations[op]);
        }
    }

    return [];
}


// Entropy
/* exported entropy */
function entropy(str) {

    // Return Shannon entropy of the given string.

    const numChars = str.length;
    const charCount = {};

    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    return -1 * Object.values(charCount)
        .map((num) => num / numChars) // calculate probabilities
        .reduce((sum, prob) => sum + prob * Math.log2(prob), 0);
}


// Evaluate binomial coefficients
function factorial(num, out) {

    // Assumption: num > out
    out = !out ? 1 : out + 1;
    const stop = out;

    for (num; num > stop; num--) {
        out *= num;
    }

    return out;
}


/* exported binom */
function binom(n, k) {

    if (k === 0 || k === n) {
        return 1;
    }

    if (n < k) {
        return 0;
    }

    const diff = n - k;

    if (k === 1 || diff === 1) {
        return n;
    }

    const numerator = factorial(n, diff);
    const denominator = factorial(k);

    return parseInt(numerator / denominator);
}


// Factors of an integer
/* exported factors */
function factors(num) {

    if (num === 1) return [1];

    const limit = Math.floor(Math.sqrt(num));
    const result = [1, num];
    const original = num;

    let m;

    for (num = 2; num <= limit; num++) {
        if (original % num === 0) {
            result.push(num);
            m = original / num;
            if (m !== num) result.push(m);
        }
    }

    // Sort the array in ascending order
    return result.sort((a, b) => a - b);
}


// Fibonacci sequence
/* exported fibonacci */
function fibonacci(n) {

    let a = 0;
    let b = 1;
    let i = 1;

    for (i; i < n; i++) {
        [a, b] = [b, a + b];
    }

    return a;
}


// Fibonacci word
/* exported fibWord */
function fibWord(n) {

    /*
     * https://github.com/freeCodeCamp/freeCodeCamp/blob/master/curriculum/challenges/english/08-coding-interview-prep/rosetta-code/fibonacci-word.english.md
     *
     * Original tests assume numbers obtained by using the change of base rule to evaluate
     * logarithms (from natural to base 2 logarithms) when calculating the Shannon entropy.
     * However, this function calculates base 2 logarithms directly. As a result of numerical
     * errors, it fails some test cases in the current form.
     *
     * The function will pass all the original tests after making two adjustments:
     * -- inserting additional auxiliary variable somewhere before the for loop
     * "const ln2 = Math.log(2);"
     * -- replacing the Shannon's entropy formula within the for loop
     * (inside an object that is pushed to the sequence array)
     * "Entropy: -1 * (prob1 * Math.log(prob1) / ln2 + prob0 * Math.log(prob0) / ln2),"
     */

    const sequence = [
        { N: 1, Length: 1, Entropy: 0, Word: '1' }, /* eslint-disable-line object-curly-newline */
        { N: 2, Length: 1, Entropy: 0, Word: '0' } /* eslint-disable-line object-curly-newline */
    ];

    // Track number of occurences of digit 1
    let prevOneCount = 1;
    let currOneCount = 0;

    // Placeholders for references to objects from the sequence array
    let a;
    let b;

    // Other auxiliary variables
    let currWordLength;
    let prob1;
    let prob0;

    const end = n;

    for (n = 3; n <= end; ++n) {

        // n referes to a position in the sequence and
        // needs to be adjusted to be used as array index
        [a, b] = sequence.slice(n - 3, n - 1);

        [prevOneCount, currOneCount] = [currOneCount, prevOneCount + currOneCount];
        currWordLength = b.Length + a.Length;
        prob1 = currOneCount / currWordLength;
        prob0 = 1 - prob1; // because every word in the sequence can contain only 1s and 0s

        sequence.push({
            N      : n,
            Length : currWordLength,
            Entropy: -1 * (prob1 * Math.log2(prob1) + prob0 * Math.log2(prob0)), // Shannon Entropy
            Word   : `${b.Word}${a.Word}`
        });
    }

    return sequence;
}


// Gamma function
/* exported gamma */
function gamma(x) {

    // Use Lanczos' approximation
    // https://en.wikipedia.org/wiki/Lanczos_approximation
    // http://www.rskey.org/CMS/index.php/the-library/11

    const coefficients = [
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];

    if (x < 0.5) {
        return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x)); // reflection formula
    }

    --x;

    const n = coefficients.reduce((sum, p, i) => sum + p / (x + i + 1), 0.99999999999980993);
    const t = x + coefficients.length - 0.5;

    return Math.sqrt(2 * Math.PI) * t ** (x + 0.5) * Math.exp(-t) * n;
}


// Gray code
/* exported gray */
function gray(enc, num) {

    if (enc) {
        return num ^ (num >> 1);
    }

    const radix = 2; // the base of the number systems
    const binaryArr = new Uint8Array(num.toString(radix).split('').map((bit) => bit >> 0));
    const len = binaryArr.length;

    let i = 1;

    for (i; i < len; i++) {
        binaryArr[i] ^= binaryArr[i - 1];
    }

    return parseInt(binaryArr.join(''), radix);
}


// Greatest common divisor
/* exported gcd */
function gcd(a, b) {

    // Euclidean algorithm - computing the greatest common divisor

    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return a;
}


// Harshad or Niven series
/* exported isHarshadOrNiven */
function isHarshadOrNiven() {

    // The Harshad/Niven numbers are positive integers
    // that are divisible by the sum of their digits.

    const result = {
        firstTwenty  : [],
        firstOver1000: undefined
    };

    const add = (sum, digit) => sum + parseInt(digit);
    const addAllDigits = (int) => int.toString().split('').reduce(add, 0);

    let num = 1;
    let sumOfDigits = 1;

    while (result.firstTwenty.length < 20) {
        if (num % sumOfDigits === 0) {
            result.firstTwenty.push(num);
        }
        sumOfDigits = addAllDigits(++num);
    }

    num = 1001;
    sumOfDigits = addAllDigits(num);

    while (num % sumOfDigits !== 0) {
        sumOfDigits = addAllDigits(++num);
    }

    result.firstOver1000 = num;

    return result;
}


// Hash from two arrays
/* exported arrToObj */
function arrToObj(keys, values) {

    const obj = {};
    const valuesIter = values.values();

    for (const key of keys) {
        obj[key] = valuesIter.next().value;
    }

    return obj;
}


// Hofstadter Q sequence
/* exported hofstadterQ */
function hofstadterQ(n) {

    if (n < 2) {
        return 1;
    }

    const len = n;
    const q = new Uint16Array(len);

    q[0] = 1;
    q[1] = 1;

    for (n = 2; n < len; n++) {
        q[n] = q[n - q[n - 1]] + q[n - q[n - 2]];
    }

    return q[len - 1];
}

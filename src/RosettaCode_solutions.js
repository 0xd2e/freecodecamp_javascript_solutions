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
 *
 * I before E except after C
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/i-before-e-except-after-c/
 *
 * IBAN
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/iban
 *
 * Identity matrix
 * https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/identity-matrix
 *
 * Josephus problem
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/josephus-problem/
 *
 * Sailors, coconuts and a monkey problem
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/sailors-coconuts-and-a-monkey-problem/
 *
 * Top rank per group
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/top-rank-per-group/
 *
 * Towers of Hanoi
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/towers-of-hanoi/
 *
 * Vector cross product
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/vector-cross-product/
 *
 * Vector dot product
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/vector-dot-product/
 */


/* eslint key-spacing: ["error", { "align": "colon" }] */


// 100 doors
/* exported getFinalOpenedDoors */
function getFinalOpenedDoors(numDoors) {
    'use strict';

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
    'use strict';

    return (num) => {
        sum += num;
        return sum;
    };
}


// Ackermann function
/* exported ack */
function ack(m, n) {
    'use strict';

    // Assumption: m and n are natural numbers (non-negative integers)

    if (m === 0) {
        return n + 1;
    }

    if (n === 0) {
        return ack(m - 1, 1);
    }

    return ack(m - 1, ack(m, n - 1));
}


// Averages/Mode
/* exported mode */
function mode(arr) {
    'use strict';

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
    'use strict';

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
    'use strict';

    // Return Root Mean Square of numbers in the given array.

    const sumSquares = arr.reduce((sum, num) => sum + num * num, 0);

    return Math.sqrt(sumSquares / arr.length);
}


// Balanced brackets
/* exported isBalanced */
function isBalanced(str) {
    'use strict';

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
    // 'use strict';

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


// Comma quibbling
/* exported quibble */
function quibble(words) {
    'use strict';

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
    'use strict';

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
    'use strict';

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
    'use strict';

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
    'use strict';

    const mean = arr.reduce((sum, num) => sum + num, 0) / arr.length;
    const variance = arr.reduce((sum, num) => sum + (num - mean) ** 2, 0) / arr.length;

    // Standard deviation for a population, rounded to 3 decimal places
    return Math.round(Math.sqrt(variance) * 1000) / 1000;
}


// CUSIP
/* exported isCusip */
function isCusip(str) {
    'use strict';

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
    'use strict';

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
    'use strict';

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


// Element-wise operations
/* exported operation */
function operation(op, arr1, otherArg) {
    'use strict';

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
    'use strict';

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
    'use strict';

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
    'use strict';

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
    'use strict';

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
    'use strict';

    let a = 0;
    let b = 1;
    let i = 1;

    for (i; i < n; i++) {
        [a, b] = [b, a + b];
    }

    return a;
}


// Gray code
/* exported gray */
function gray(enc, num) {
    'use strict';

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
    'use strict';

    // Euclidean algorithm - computing the greatest common divisor

    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return a;
}


// Harshad or Niven series
/* exported isHarshadOrNiven */
function isHarshadOrNiven() {
    'use strict';

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
    'use strict';

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
    'use strict';

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


// I before E except after C
/* exported IBeforeExceptC */
function IBeforeExceptC(word) {
    'use strict';

    word = word.toLowerCase();

    // Check for rules violation
    const breakedRule1 = word.includes('cie'); // "I before E when not preceded by C"
    const breakedRule2 = (/[^c]ei/).test(word); // "E before I when preceded by C"

    return !(breakedRule1 || breakedRule2);
}


// IBAN
const IBAN_FORMATS = {
    AD: /^AD\d{2}\d{8}[a-zA-Z0-9]{12}$/, // Andorra
    AE: /^AE\d{2}\d{19}$/, // United Arab Emirates
    AL: /^AL\d{2}\d{8}[a-zA-Z0-9]{16}$/, // Albania
    AT: /^AT\d{2}\d{16}$/, // Austria
    AZ: /^AZ\d{2}[A-Z]{4}[a-zA-Z0-9]{20}$/, // Azerbaijan
    BA: /^BA\d{2}\d{16}$/, // Bosnia and Herzegovina
    BE: /^BE\d{2}\d{12}$/, // Belgium
    BG: /^BG\d{2}[A-Z]{4}\d{6}[a-zA-Z0-9]{8}$/, // Bulgaria
    BH: /^BH\d{2}[A-Z]{4}[a-zA-Z0-9]{14}$/, // Bahrain
    BR: /^BR\d{2}\d{23}[A-Z]{1}[a-zA-Z0-9]{1}$/, // Brazil
    BY: /^BY\d{2}[a-zA-Z0-9]{4}\d{4}[a-zA-Z0-9]{16}$/, // Republic of Belarus
    CH: /^CH\d{2}\d{5}[a-zA-Z0-9]{12}$/, // Switzerland
    CR: /^CR\d{2}\d{18}$/, // Costa Rica
    CY: /^CY\d{2}\d{8}[a-zA-Z0-9]{16}$/, // Cyprus
    CZ: /^CZ\d{2}\d{20}$/, // Czech Republic
    DE: /^DE\d{2}\d{18}$/, // Germany
    DK: /^DK\d{2}\d{14}$/, // Denmark
    DO: /^DO\d{2}[a-zA-Z0-9]{4}\d{20}$/, // Dominican Republic
    EE: /^EE\d{2}\d{16}$/, // Estonia
    ES: /^ES\d{2}\d{20}$/, // Spain
    FI: /^FI\d{2}\d{14}$/, // Finland
    FO: /^FO\d{2}\d{14}$/, // Faroe Islands
    FR: /^FR\d{2}\d{10}[a-zA-Z0-9]{11}\d{2}$/, // France
    GB: /^GB\d{2}[A-Z]{4}\d{14}$/, // United Kingdom
    GE: /^GE\d{2}[A-Z]{2}\d{16}$/, // Georgia
    GI: /^GI\d{2}[A-Z]{4}[a-zA-Z0-9]{15}$/, // Gibraltar
    GL: /^GL\d{2}\d{14}$/, // Greenland
    GR: /^GR\d{2}\d{7}[a-zA-Z0-9]{16}$/, // Greece
    GT: /^GT\d{2}[a-zA-Z0-9]{24}$/, // Guatemala
    HR: /^HR\d{2}\d{17}$/, // Croatia
    HU: /^HU\d{2}\d{24}$/, // Hungary
    IE: /^IE\d{2}[A-Z]{4}\d{14}$/, // Ireland
    IL: /^IL\d{2}\d{19}$/, // Israel
    IQ: /^IQ\d{2}[A-Z]{4}\d{15}$/, // Iraq
    IS: /^IS\d{2}\d{22}$/, // Iceland
    IT: /^IT\d{2}[A-Z]{1}\d{10}[a-zA-Z0-9]{12}$/, // Italy
    JO: /^JO\d{2}[A-Z]{4}\d{4}[a-zA-Z0-9]{18}$/, // Jordan
    KW: /^KW\d{2}[A-Z]{4}[a-zA-Z0-9]{22}$/, // Kuwait
    KZ: /^KZ\d{2}\d{3}[a-zA-Z0-9]{13}$/, // Kazakhstan
    LB: /^LB\d{2}\d{4}[a-zA-Z0-9]{20}$/, // Lebanon
    LC: /^LC\d{2}[A-Z]{4}[a-zA-Z0-9]{24}$/, // Saint Lucia
    LI: /^LI\d{2}\d{5}[a-zA-Z0-9]{12}$/, // Liechtenstein
    LT: /^LT\d{2}\d{16}$/, // Lithuania
    LU: /^LU\d{2}\d{3}[a-zA-Z0-9]{13}$/, // Luxembourg
    LV: /^LV\d{2}[A-Z]{4}[a-zA-Z0-9]{13}$/, // Latvia
    MC: /^MC\d{2}\d{10}[a-zA-Z0-9]{11}\d{2}$/, // Monaco
    MD: /^MD\d{2}[a-zA-Z0-9]{20}$/, // Moldova
    ME: /^ME\d{2}\d{18}$/, // Montenegro
    MK: /^MK\d{2}\d{3}[a-zA-Z0-9]{10}\d{2}$/, // Macedonia
    MR: /^MR\d{2}\d{23}$/, // Mauritania
    MT: /^MT\d{2}[A-Z]{4}\d{5}[a-zA-Z0-9]{18}$/, // Malta
    MU: /^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$/, // Mauritius
    NL: /^NL\d{2}[A-Z]{4}\d{10}$/, // Netherlands
    NO: /^NO\d{2}\d{11}$/, // Norway
    PK: /^PK\d{2}[A-Z]{4}[a-zA-Z0-9]{16}$/, // Pakistan
    PL: /^PL\d{2}\d{24}$/, // Poland
    PS: /^PS\d{2}[A-Z]{4}[a-zA-Z0-9]{21}$/, // Palestine
    PT: /^PT\d{2}\d{21}$/, // Portugal
    QA: /^QA\d{2}[A-Z]{4}[a-zA-Z0-9]{21}$/, // Qatar
    RO: /^RO\d{2}[A-Z]{4}[a-zA-Z0-9]{16}$/, // Romania
    RS: /^RS\d{2}\d{18}$/, // Serbia
    SA: /^SA\d{2}\d{2}[a-zA-Z0-9]{18}$/, // Saudi Arabia
    SC: /^SC\d{2}[A-Z]{4}\d{20}[A-Z]{3}$/, // Seychelles
    SE: /^SE\d{2}\d{20}$/, // Sweden
    SI: /^SI\d{2}\d{15}$/, // Slovenia
    SK: /^SK\d{2}\d{20}$/, // Slovakia
    SM: /^SM\d{2}[A-Z]{1}\d{10}[a-zA-Z0-9]{12}$/, // San Marino
    ST: /^ST\d{2}\d{21}$/, // Sao Tome and Principe
    SV: /^SV\d{2}[A-Z]{4}\d{20}$/, // El Salvador
    TL: /^TL\d{2}\d{19}$/, // Timor-Leste
    TN: /^TN\d{2}\d{20}$/, // Tunisia
    TR: /^TR\d{2}\d{6}[a-zA-Z0-9]{16}$/, // Turkey
    UA: /^UA\d{2}\d{6}[a-zA-Z0-9]{19}$/, // Ukraine
    VA: /^VA\d{2}\d{18}$/, // Vatican City State
    VG: /^VG\d{2}[A-Z]{4}\d{16}$/, // Virgin Islands
    XK: /^XK\d{2}\d{16}$/ // Kosovo
};


const IBAN_SUBSTITUTION_TABLE = {
    A: '10',
    B: '11',
    C: '12',
    D: '13',
    E: '14',
    F: '15',
    G: '16',
    H: '17',
    I: '18',
    J: '19',
    K: '20',
    L: '21',
    M: '22',
    N: '23',
    O: '24',
    P: '25',
    Q: '26',
    R: '27',
    S: '28',
    T: '29',
    U: '30',
    V: '31',
    W: '32',
    X: '33',
    Y: '34',
    Z: '35'
};


function modulo97(numStr) {
    'use strict';

    /*
     * Input:
     * numStr -- numeric string, very big positive integer
     *
     * Based on: https://en.wikipedia.org/wiki/International_Bank_Account_Number#Structure#Modulo_operation_on_IBAN
     *
     * Returns an integer, the remainder after division of the given number by 97.
     */

    const len = numStr.length;

    let i = 9;
    let n = parseInt(numStr.slice(0, i));

    for (i; i < len; i += 7) {
        n = parseInt(`${n % 97}${numStr.slice(i, i + 7)}`);
    }

    return n % 97;
}


/* exported isValid */
function isValid(iban) {
    'use strict';

    iban = iban.replace(/\s/g, ''); // remove all whitespace characters

    const countryCode = iban.slice(0, 2);

    if (!IBAN_FORMATS.hasOwnProperty(countryCode)) return false;
    if (!IBAN_FORMATS[countryCode].test(iban)) return false;

    iban = iban.toUpperCase();
    iban = `${iban.slice(4)}${iban.slice(0, 4)}`;
    iban = iban.split('')
        .map((char) => IBAN_SUBSTITUTION_TABLE[char] || char)
        .join('');

    return modulo97(iban) === 1;
}


// Identity matrix
/* exported idMatrix */
function idMatrix(n) {
    'use strict';

    const m = n;
    const matrix = [];
    const row = new Array(m);

    row.fill(0);
    Object.freeze(row);
    Object.seal(row);

    for (n = 0; n < m; ++n) {
        matrix.push([...row]);
        matrix[n][n] = 1;
    }

    return matrix;
}


// Josephus problem
/* exported josephus */
function josephus(init, kill) {
    'use strict';

    // Based on: https://en.wikipedia.org/wiki/Josephus_problem#The_general_case
    // For the positions numbered from 1 to n

    if (init === 1) {
        return 1;
    }

    return ((josephus(init - 1, kill) + kill - 1) % init) + 1;
}


// Sailors, coconuts and a monkey problem
/* exported splitCoconuts */
function splitCoconuts(n) {
    'use strict';

    // This equations are from: http://oeis.org/A002021
    return n & 1 ? (n ** n) - n + 1 : (n - 1) * ((n ** n) - 1);
}


// Top rank per group
/* exported topRankPerGroup */
function topRankPerGroup(n, data, groupby, rankby) {
    'use strict';

    if (n < 0) {
        return undefined;
    }

    const uniqueGroups = new Set(data.map((item) => item[groupby]));
    const arrangeDesc = (a, b) => b[rankby] - a[rankby];
    const processedData = [];

    if (uniqueGroups.size === 1) {
        data = [...data]; // create a shallow copy, do not change the original array
        data = data.sort(arrangeDesc).slice(0, n);
        processedData.push(data);
        return processedData;
    }

    const sortedGroups = [...uniqueGroups].sort();
    let group;
    let items;
    const selectGroup = (item) => item[groupby] === group;

    for (group of sortedGroups) {
        items = data.filter(selectGroup).sort(arrangeDesc).slice(0, n);
        processedData.push(items);
    }

    return processedData;
}


// Towers of Hanoi
/* exported towerOfHanoi */
function towerOfHanoi(num, source, target, auxiliary) {
    'use strict';

    const moves = [];

    // This algorithm is from: https://en.wikipedia.org/wiki/Tower_of_Hanoi#Recursive_implementation
    const makeMove = (n, a, b, c) => {
        if (n > 0) {
            makeMove(n - 1, a, c, b);
            moves.push([a, b]);
            makeMove(n - 1, c, b, a);
        }
    };

    makeMove(num, source, target, auxiliary);

    return moves;
}


// Vector cross product
/* exported crossProduct */
function crossProduct() {
    'use strict';

    if (arguments.length !== 2) {
        return null;
    }

    const [v, w] = arguments;

    if (v.length !== 3 || w.length !== 3) {
        return null;
    }

    const [vx, vy, vz] = v;
    const [wx, wy, wz] = w;

    return [
        vy * wz - vz * wy,
        vz * wx - vx * wz,
        vx * wy - vy * wx
    ];
}


// Vector dot product
/* exported dotProduct */
function dotProduct() {
    'use strict';

    let vectors;

    if (arguments.length === 1) {
        vectors = [...arguments[0]];
    } else if (arguments.length > 1) {
        vectors = [...arguments];
    } else {
        return null;
    }

    if (vectors.length < 2) {
        return null;
    }

    const n = vectors[0].length;

    if (n === 0 || vectors.some((vec) => vec.length !== n)) {
        return null;
    }

    let i = 0;
    let dot = 0;

    const mul = (prod, vec) => prod * vec[i];

    for (i; i < n; i++) {
        dot += vectors.reduce(mul, 1);
    }

    return dot;
}

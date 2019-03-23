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
 * Averages/Root mean square
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/averagesroot-mean-square/
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
 * Fibonacci sequence
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/fibonacci-sequence/
 *
 * Gray code
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/gray-code/
 *
 * Greatest common divisor
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/greatest-common-divisor/
 *
 * Hofstadter Q sequence
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/hofstadter-q-sequence/
 *
 * Josephus problem
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/josephus-problem/
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

    return doors.filter(num => num > 0);
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


// Averages/Root mean square
/* exported rms */
function rms(arr) {
    'use strict';

    // Return Root Mean Square of numbers in the given array.

    const sumSquares = arr.reduce((sum, num) => sum + num * num, 0);

    return Math.sqrt(sumSquares / arr.length);
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

    return centers.map(xy => [
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
    return arr.every(currVal => currVal === value);
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
function operation(op, arr1, arr2) {
    'use strict';

    // eslint-disable-next-line max-len
    const checkMatrixes = (m1, m2) => m1.length === m2.length && m1.every((vec, i) => vec.length === m2[i].length);
    const num = 2;

    const validOperations = {
        m_add : (vec, i) => vec.map((val, j) => val + arr2[i][j]),
        m_sub : (vec, i) => vec.map((val, j) => val - arr2[i][j]),
        m_mult: (vec, i) => vec.map((val, j) => val * arr2[i][j]),
        m_div : (vec, i) => vec.map((val, j) => val / arr2[i][j]),
        m_exp : (vec, i) => vec.map((val, j) => val ** arr2[i][j]),
        s_add : vec => vec.map(val => val + num),
        s_sub : vec => vec.map(val => val - num),
        s_mult: vec => vec.map(val => val * num),
        s_div : vec => vec.map(val => val / num),
        s_exp : vec => vec.map(val => val ** num)
    };

    if (!validOperations.hasOwnProperty(op) || (op.startsWith('m') && !checkMatrixes(arr1, arr2))) {
        return [];
    }

    return arr1.map(validOperations[op]);
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
        .map(num => num / numChars) // calculate probabilities
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
    const binaryArr = new Uint8Array(num.toString(radix).split('').map(bit => bit >> 0));
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


// Top rank per group
/* exported topRankPerGroup */
function topRankPerGroup(n, data, groupby, rankby) {
    'use strict';

    if (n < 0) {
        return undefined;
    }

    const uniqueGroups = new Set(data.map(item => item[groupby]));
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
    const selectGroup = item => item[groupby] === group;

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

    if (n === 0 || vectors.some(vec => vec.length !== n)) {
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

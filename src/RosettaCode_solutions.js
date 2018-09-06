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
 * Entropy
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/entropy/
 *
 * Fibonacci sequence
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/fibonacci-sequence/
 *
 * Gray code
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/gray-code/
 */


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

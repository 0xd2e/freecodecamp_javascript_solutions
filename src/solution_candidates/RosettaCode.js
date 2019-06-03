/*
 * ROSETTA CODE
 *
 * Date manipulation
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/date-manipulation/
 *
 * Equilibrium index
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/equilibrium-index/
 *
 * Greatest subsequential sum
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/greatest-subsequential-sum/
 */


/* eslint-env node, amd */
/* eslint key-spacing: ["error", { "align": "colon" }] */


// Date manipulation
function parseDateTimeString(dateString) {
    'use strict';

    // Example of input string: 'March 7 2009 7:30pm EST'

    // Named capturing groups support in JavaScript Regular Expressions can be problematic
    // const dateParserRegExp = /^(?<month>\w+) (?<day>\d{1,2}) (?<year>\d{4}) (?<hour>\d{1,2}):(?<minute>\d{2}) ?(?<meridiem>pm|am) (?<timezone>\w+)$/;

    const regex = /^(\w+) (\d{1,2}) (\d{4}) (\d{1,2}):(\d{2}) ?(pm|am) (\w+)$/i;
    const dateParts = regex.exec(dateString);

    const months = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11
    };

    const dateObject = new Date(
        parseInt(dateParts[3]), // year
        months[dateParts[1].toLowerCase().slice(0, 3)], // month
        parseInt(dateParts[2]), // day
        parseInt(dateParts[4]), // hour
        parseInt(dateParts[5]) // minute
    );

    const meridiem = dateParts[6].toLowerCase();

    if (meridiem === 'pm' && dateParts[4] !== '12') {
        dateObject.setHours(dateObject.getHours() + 12);
    } else if (meridiem === 'am' && dateParts[4] === '12') {
        dateObject.setHours(dateObject.getHours() - 12);
    }

    dateObject.timezone = dateParts[7];

    return dateObject;
}


function formatDateTime(dateObject) {
    'use strict';

    const loc = 'en-US';

    const parts = {
        month: dateObject.toLocaleString(loc, { month: 'long' }),
        day  : dateObject.toLocaleString(loc, { day: 'numeric' }),
        year : dateObject.getFullYear().toString(),
        time : dateObject.toLocaleString(loc, { hour12: true, hour: 'numeric', minute: '2-digit' })
    };

    parts.time = parts.time.replace(' ', '').toLowerCase();

    const template = [
        parts.month,
        parts.day,
        parts.year,
        parts.time,
        dateObject.timezone
    ];

    return template.join(' ');
}


/* exported add12Hours */
function add12Hours(dateString) {
    'use strict';

    const dateObject = parseDateTimeString(dateString);

    dateObject.setHours(dateObject.getHours() + 12);

    return formatDateTime(dateObject);
}


// Equilibrium index
/* exported equilibrium */
function equilibrium(arr) {
    'use strict';

    const equilibriumIndexes = [];
    const len = arr.length;

    let rightSum = arr.reduce((sum, num) => sum + num, 0);
    let leftSum = 0;
    let i = 0;

    for (i; i < len; i++) {
        rightSum -= arr[i];
        if (rightSum === leftSum) {
            equilibriumIndexes.push(i);
        }
        leftSum += arr[i];
    }

    return equilibriumIndexes;
}


// Greatest subsequential sum
/* exported maximumSubsequence */
function maximumSubsequence(arr) {
    'use strict';

    // Kadane's algorithm - finding a contiguous subarray with the largest sum
    // Based on: https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's_algorithm

    const n = arr.length;

    if (n === 0) {
        return 0;
    }

    let currMaxSum = 0;
    let currMaxStart = 0;
    let maxSum = 0;
    let start = 0;
    let end = 0;
    let i = 0;

    for (i; i < n; i++) {
        currMaxSum += arr[i];
        if (currMaxSum < 0) {
            currMaxSum = 0;
            currMaxStart = i + 1;
        } else if (currMaxSum > maxSum) {
            maxSum = currMaxSum;
            start = currMaxStart;
            end = i + 1;
        }
    }

    return arr.slice(start, end);
}


module.exports = {
    add12Hours,
    equilibrium,
    maximumSubsequence
};

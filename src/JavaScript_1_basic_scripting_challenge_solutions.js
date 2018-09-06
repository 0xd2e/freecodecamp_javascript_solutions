/*
 * BASIC ALGORITHM SCRIPTING
 *
 * 1. Convert Celsius to Fahrenheit
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/convert-celsius-to-fahrenheit/
 *
 * 2. Reverse a String
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/reverse-a-string
 *
 * 3. Factorialize a Number
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/factorialize-a-number
 *
 * 4. Find the Longest Word in a String
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/find-the-longest-word-in-a-string
 *
 * 5. Return Largest Numbers in Arrays
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/return-largest-numbers-in-arrays
 *
 * 6. Confirm the Ending
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/confirm-the-ending
 *
 * 7. Repeat a String Repeat a String
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/repeat-a-string-repeat-a-string
 *
 * 8. Truncate a String
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/truncate-a-string
 *
 * 9. Finders Keepers
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/finders-keepers
 *
 * 10. Boo who
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/boo-who
 *
 * 11. Title Case a Sentence
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/title-case-a-sentence
 *
 * 12. Slice and Splice
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/slice-and-splice/
 *
 * 13. Falsy Bouncer
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/falsy-bouncer
 *
 * 14. Where do I Belong
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/where-do-i-belong
 *
 * 15. Mutations
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/mutations
 *
 * 16. Chunky Monkey
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/chunky-monkey
 */


// Convert Celsius to Fahrenheit
/* exported convertToF */
function convertToF(celsius) {
    'use strict';

    return celsius * 9 / 5 + 32;
}


// Reverse a String
/* exported reverseString */
function reverseString(str) {
    'use strict';

    return str.split('').reverse().join('');
}


// Factorialize a Number
/* exported factorialize */
function factorialize(num) {
    'use strict';

    let result = 1;

    for (num; num > 1; num--) {
        result *= num;
    }

    return result;
}


// Find the Longest Word in a String
/* exported findLongestWordLength */
function findLongestWordLength(str) {
    'use strict';

    let longest = 0;
    let word;

    for (word of str.split(' ')) {
        if (longest < word.length) {
            longest = word.length;
        }
    }

    return longest;
}


// Return Largest Numbers in Arrays
/* exported largestOfFour */
function largestOfFour(arr) {
    'use strict';

    const nums = [];
    let subArray;

    for (subArray of arr) {
        nums.push(Math.max(...subArray));
    }

    return nums;
}


// Confirm the Ending
/* exported confirmEnding */
function confirmEnding(str, target) {
    'use strict';

    // Same as: return str.endsWith(target);
    return str.substring(str.length - target.length) === target;
}


// Repeat a String Repeat a String
/* exported repeatStringNumTimes */
function repeatStringNumTimes(str, num) {
    'use strict';

    if (num < 1 || str === '') {
        return '';
    }

    // Same as: return str.repeat(num);
    return Array(num).fill(str).join('');
}


// Truncate a String
/* exported truncateString */
function truncateString(str, num) {
    'use strict';

    return (str.length > num) ? `${str.slice(0, num)}...` : str;
}


// Finders Keepers
/* exported findElement */
// eslint-disable-next-line consistent-return
function findElement(arr, func) {
    'use strict';

    let item;

    for (item of arr) {
        if (func(item)) {
            return item;
        }
    }
}


// Boo who
/* exported booWho */
function booWho(bool) {
    'use strict';

    return bool === true || bool === false;
}

// Title Case a Sentence
/* exported titleCase */
function titleCase(str) {
    'use strict';

    const separator = ' ';
    const words = [];
    let word;

    for (word of str.split(separator)) {
        words.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
    }

    return words.join(separator);
}


// Slice and Splice
/* exported frankenSplice */
function frankenSplice(arr1, arr2, n) {
    'use strict';

    // Do not change the original arrays
    return arr2.slice().splice(n, 0, ...arr1);
}


// Falsy Bouncer
/* exported bouncer */
function bouncer(arr) {
    'use strict';

    return arr.filter(item => item);
}


// Where do I Belong
/* exported getIndexToIns */
function getIndexToIns(arr, num) {
    'use strict';

    return arr.reduce((acc, cur) => acc + (num > cur), 0);
}


// Mutations
/* exported mutation */
function mutation(arr) {
    'use strict';

    // Check if a set of letters from the string in the second element of the array
    // is a subset of letters from the string in the first element of the array
    // (case insensitive).

    const first = new Set(arr[0].toLowerCase());
    const second = new Set(arr[1].toLowerCase());

    let elem;

    for (elem of second) {
        if (!first.has(elem)) {
            return false;
        }
    }

    return true;
}


// Chunky Monkey
/* exported chunkArrayInGroups */
function chunkArrayInGroups(arr, size) {
    'use strict';

    // Do not change the original array
    const arrChunks = [];

    let i = 0;

    for (i; i < arr.length; i += size) {
        arrChunks.push(arr.slice(i, i + size));
    }

    return arrChunks;
}

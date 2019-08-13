/*
 * INTERMEDIATE ALGORITHM SCRIPTING
 *
 * 1. Sum All Numbers in a Range
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-numbers-in-a-range/
 *
 * 2. Diff Two Arrays
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/diff-two-arrays
 *
 * 3. Seek and Destroy
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/seek-and-destroy
 *
 * 4. Wherefore art thou
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/wherefore-art-thou
 *
 * 5. Spinal Tap Case
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/spinal-tap-case
 *
 * 6. Pig Latin
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/pig-latin
 *
 * 7. Search and Replace
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/search-and-replace
 *
 * 8. DNA Pairing
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/dna-pairing
 *
 * 9. Missing letters
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/missing-letters
 *
 * 10. Sorted Union
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sorted-union
 *
 * 11. Convert HTML Entities
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/convert-html-entities
 *
 * 12. Sum All Odd Fibonacci Numbers
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-odd-fibonacci-numbers
 *
 * 13. Sum All Primes
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-primes
 *
 * 14. Smallest Common Multiple
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/smallest-common-multiple
 *
 * 15. Drop it
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/drop-it
 *
 * 16. Steamroller
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/steamroller
 *
 * 17. Binary Agents
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/binary-agents
 *
 * 18. Everything Be True
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/everything-be-true
 *
 * 19. Arguments Optional
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/arguments-optional
 *
 * 20. Make a Person
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/make-a-person
 *
 * 21. Map the Debris
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/map-the-debris
 */


// Sum All Numbers in a Range
/* exported sumAll */
function sumAll(arr) {
    'use strict';

    let [low, sum] = arr;

    if (low > sum) {
        [low, sum] = [sum, low];
    }

    const high = sum;

    for (low; low < high; low++) {
        sum += low;
    }

    return sum;
}


// Diff Two Arrays
/* exported diffArray */
function diffArray(arr1, arr2) {
    'use strict';

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const symmDiff = [];

    // From set2 remove elements that are common for both sets:
    // if element is not deleted, it is unique to set2;
    // elements left in set2 are unique to this set.

    let elem;

    for (elem of set1) {
        if (!set2.delete(elem)) {
            symmDiff.push(elem);
        }
    }

    symmDiff.push(...set2);

    return symmDiff;
}


// Seek and Destroy
/* exported destroyer */
function destroyer(arr) {
    'use strict';

    // Additional argument(s)
    const [, ...args] = arguments;

    // Do not mutate the original array
    for (const arg of args) {
        arr = arr.filter(item => item !== arg);
    }

    return arr;
}


/* exported mutatingDestroyer */
function mutatingDestroyer(arr, ...args) {
    // 'use strict';

    // Mutate (change values in place) and return a reference to the given array.

    let arg;
    let i;

    for (arg of args) {
        i = arr.indexOf(arg);
        while (i >= 0) {
            arr.splice(i, 1);
            i = arr.indexOf(arg);
        }
    }

    return arr;
}


// Wherefore art thou
/* exported whatIsInAName */
function whatIsInAName(collection, source) {
    'use strict';

    const arr = [];

    let obj;
    let key;
    let match;

    for (obj of collection) {

        match = true;

        for (key in source) {
            if (!obj.hasOwnProperty(key) || obj[key] !== source[key]) {
                match = false;
                break;
            }
        }

        if (match) {
            arr.push(obj);
        }
    }

    return arr;
}


// Spinal Tap Case
/* exported spinalCase */
function spinalCase(str) {
    'use strict';

    return str
        .trim()
        .replace(/[ _]|<\w*>/g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
}


// Pig Latin
/* exported translatePigLatin */
function translatePigLatin(str) {
    'use strict';

    str = str.trim().toLowerCase();

    const firstVowelPos = str.search(/[aeiou]/);

    switch (firstVowelPos) {
    case 0:
        str += 'way';
        break;
    case -1:
        str += 'ay';
        break;
    default:
        str = `${str.slice(firstVowelPos)}${str.slice(0, firstVowelPos)}ay`;
    }

    return str;
}


// Search and Replace
/* exported myReplace */
function myReplace(str, before, after) {
    'use strict';

    const regex = new RegExp(before, 'ig');
    const firstChar = after[0].toLowerCase() + after[0].toUpperCase();

    after = after.slice(1);

    return str.replace(regex, (substr) => {

        // Check if first letter of a matched substring is upper case
        const isUpperCase = substr[0].toUpperCase() === substr[0];

        // Convert boolean to integer and adjust character case accordingly
        return firstChar[isUpperCase >> 0] + after;
    });
}


// DNA Pairing
/* exported pairElement */
function pairElement(str) {
    'use strict';

    const pairs = {
        A: 'T',
        T: 'A',
        C: 'G',
        G: 'C'
    };

    return str.split('').map(elem => [elem, pairs[elem] || '']);
}


// Missing letters
/* exported fearNotLetter */
// eslint-disable-next-line consistent-return
function fearNotLetter(str) {
    'use strict';

    const letters = 'abcdefghijklmnopqrstuvwxyz';

    let i = letters.indexOf(str[0]);

    let char;

    for (char of str) {
        if (letters[i++] !== char) {
            return letters[i - 1];
        }
    }
}


// Sorted Union
/* exported uniteUnique */
function uniteUnique(arr) {
    'use strict';

    // Perform only naive/shallow check of valus in argument arrays,
    // i.e. any sub-array of the nested argument array is consider
    // unique even if there is already a sub-array of the same length
    // and with the same elements in the same order.

    const uniqueValues = new Set();

    let item;

    for (arr of arguments) {
        for (item of arr) {
            uniqueValues.add(item);
        }
    }

    return [...uniqueValues];
}


// Convert HTML Entities
/* exported convertHTML */
function convertHTML(str) {
    'use strict';

    const symbols = {
        '&': '&amp;',
        '>': '&gt;',
        '<': '&lt;',
        '"': '&quot;',
        '\'': '&apos;'
    };

    // Remember that some characters in regular expression must be escaped with backslash.
    return str.replace(/[&><"']/g, char => symbols[char]);
}


// Sum All Odd Fibonacci Numbers
/* exported sumFibs */
function sumFibs(num) {
    'use strict';

    let sum = 1;
    let a = 1;
    let b = 1;

    while (b <= num) {
        if (b & 1) sum += b;
        [a, b] = [b, a + b];
    }

    return sum;
}


// Sum All Primes
/* exported sumPrimes */
function sumPrimes(int) {
    'use strict';

    if (int <= 10) {
        // eslint-disable-next-line no-confusing-arrow
        return [2, 3, 5, 7].reduce((sum, num) => sum + ((num <= int) ? num : 0), 0);
    }

    // Ensure that int is an even number
    if (int & 1) int++;

    // Algorithm to find prime numbers within a range is from
    // https://stackoverflow.com/a/2068548
    // and is originally written for Python 2.

    const end = Math.floor(Math.sqrt(int)) + 1;
    const len = parseInt(int / 3) + (int % 6 === 2);
    const sieve = new Uint32Array(len);

    sieve.fill(1);

    // eslint-disable-next-line one-var, one-var-declaration-per-line
    let i, j, k, kk;

    for (i = 1; i < end; i++) {
        if (sieve[i]) {

            k = (3 * i + 1) | 1;
            kk = k + k;

            j = parseInt(k * k / 3);

            for (j; j < len; j += kk) sieve[j] = 0;

            j = parseInt(k * (k - 2 * (i & 1) + 4) / 3);

            for (j; j < len; j += kk) sieve[j] = 0;
        }
    }

    let sum = 5; // 2 + 3

    for (i = 1; i < len; i++) {
        if (sieve[i] > 0) {
            sum += ((3 * i + 1) | 1);
        }
    }

    return sum;
}


// Smallest Common Multiple
function findGreatestCommonDivisor(a, b) {
    'use strict';

    // Use Euclidean algorithm to find Greatest Common Divisor.

    if (a === 1 || b === 1) {
        return 1;
    }

    // Version with modulo operator
    // if (a < b) [a, b] = [b, a];
    // while (b !== 0) [a, b] = [b, a % b];

    while (a !== b) {
        if (a < b) {
            b -= a;
        } else {
            a -= b;
        }
    }

    return a;
}


/* exported smallestCommons */
function smallestCommons(arr) {
    'use strict';

    // Find Greatest Common Divisor and use it to find Least Common Multiple.

    const end = arr[0] > arr[1] ? arr[0] : arr[1];

    let num = arr[0] < arr[1] ? arr[0] : arr[1];
    let scm = end;

    for (num; num < end; num++) {
        scm *= num / findGreatestCommonDivisor(num, scm);
    }

    return scm;
}


// Drop it
/* exported dropElements */
function dropElements(arr, func) {
    'use strict';

    let i = 0;

    while (!func(arr[i])) i++;

    return arr.slice(i);
}


// Steamroller
/* exported steamrollArray */
function steamrollArray(arr) {
    'use strict';

    // Return a flattened version of the given (nested) array.

    const flat = [];

    let item;

    for (item of arr) {
        if (Array.isArray(item)) {
            flat.push(...steamrollArray(item));
        } else {
            flat.push(item);
        }
    }

    return flat;
}


// Binary Agents
/* exported binaryAgent */
function binaryAgent(str) {
    'use strict';

    const sentence = [];

    let char;

    for (char of str.split(' ')) {
        char = String.fromCharCode(parseInt(char, 2));
        sentence.push(char);
    }

    return sentence.join('');
}


// Everything Be True
/* exported truthCheck */
function truthCheck(collection, pre) {
    'use strict';

    let obj;

    for (obj of collection) {
        if (!obj[pre]) {
            return false;
        }
    }

    return true;
}


// Arguments Optional
/* exported addTogether */
// eslint-disable-next-line consistent-return
function addTogether() {
    'use strict';

    if (arguments.length === 2 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        return arguments[0] + arguments[1];
    }

    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        // eslint-disable-next-line no-confusing-arrow
        return num => typeof num === 'number' ? arguments[0] + num : undefined;
    }
}


// Make a Person
/* exported Person */
const Person = function (firstAndLast) {
    'use strict';

    /* eslint func-names: "off" */

    // Use closures to protect properties within objects
    let firstName;
    let lastName;
    let fullName;

    this.getFirstName = function () {
        return firstName;
    };

    this.getLastName = function () {
        return lastName;
    };

    this.getFullName = function () {
        return fullName;
    };

    this.setFirstName = function (first) {
        this.setFullName(`${first} ${lastName}`);
    };

    this.setLastName = function (last) {
        this.setFullName(`${firstName} ${last}`);
    };

    // eslint-disable-next-line no-shadow
    this.setFullName = function (firstAndLast) {
        fullName = firstAndLast;
        [firstName, lastName] = firstAndLast.split(' ');
    };

    this.setFullName(firstAndLast);

    return fullName;
};


/* exported ModernPerson */
class ModernPerson {

    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

    constructor(firstAndLast) {
        'use strict';

        this._firstName = '';
        this._lastName = '';
        this._fullName = '';

        this.fullName = firstAndLast;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get fullName() {
        return this._fullName;
    }

    set firstName(first) {
        this.fullName = `${first} ${this._lastName}`;
    }

    set lastName(last) {
        this.fullName = `${this._firstName} ${last}`;
    }

    set fullName(firstAndLast) {
        this._fullName = firstAndLast;
        [this._firstName, this._lastName] = firstAndLast.split(' ');
    }

}


// Map the Debris
/* exported orbitalPeriod */
function orbitalPeriod(arr) {
    'use strict';

    // The standard gravitational parameter of Earth, in km^+3*s^-2
    // Product of the gravitational constant and Earth's mass
    const GM = 398600.4418;

    // Earth's radius, in kilometers
    const earthRadius = 6367.4447;

    return arr.map((satellite) => {

        // Satellite's orbital period, in seconds
        // eslint-disable-next-line no-restricted-properties
        const satPeriod = 2 * Math.PI * Math.sqrt(Math.pow(earthRadius + satellite.avgAlt, 3) / GM);

        return {
            name: satellite.name,
            orbitalPeriod: Math.round(satPeriod)
        };
    });
}

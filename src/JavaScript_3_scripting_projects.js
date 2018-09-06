/*
 * 1. Palindrome Checker
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker/
 *
 * 2. Roman Numeral Converter
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter
 *
 * 3. Caesars Cipher
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher
 *
 * 4. Telephone Number Validator
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator/
 *
 * 5. Cash Register
 * https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register/
 */


// Palindrome Checker
/* exported palindrome */
function palindrome(str) {
    'use strict';

    // Return true if the given string is a palindrome, false otherwise.

    // Clean up input string and make an array of letters and digits only
    const strCleaned = str.toLowerCase().split('').filter(char => /^[a-z0-9]$/.test(char));
    const leftToRight = strCleaned.join('');
    const rightToLeft = strCleaned.reverse().join('');

    return leftToRight === rightToLeft;
}


// Roman Numeral Converter
/* exported convertToRoman */
function convertToRoman(num) {
    'use strict';

    /*
     * Input:
     * num -- integer number between and including 1 and 3999
     *
     * Return a string with a roman numeral of the given number.
     */

    // Check input conditions
    if (num < 1 || num > 3999) {
        return '';
    }

    const romanSymbols = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M'
    };

    const romanNums = [];

    let rem;
    let base;

    for (base = 1000; base >= 1; base /= 10) {

        rem = num % base;
        num = num / base >> 0;

        switch (num) {
        case 1:
        case 2:
        case 3:
            romanNums.push(romanSymbols[base].repeat(num));
            break;
        case 4:
        case 5:
            romanNums.push(romanSymbols[base].repeat(5 - num) + romanSymbols[base * 5]);
            break;
        case 6:
        case 7:
        case 8:
            romanNums.push(romanSymbols[base * 5] + romanSymbols[base].repeat(num - 5));
            break;
        case 9:
            romanNums.push(romanSymbols[base] + romanSymbols[base * 10]);
        // no default
        }

        num = rem;
    }

    return romanNums.join('');
}


// Caesars Cipher
/* exported rot13 */
function rot13(encryptedStr) {
    'use strict';

    /*
     * Input:
     *
     * encryptedStr
     * -- string of uppercase characters encoded by Caesar cipher
     *    with letters shifted by 13 places
     *
     * Return decoded string.
     */

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const decryptedMsg = [];
    const cipherKey = 13;

    let pos;
    let char;

    for (char of encryptedStr) {

        // Check if a character is an upper case letter
        pos = letters.indexOf(char);

        if (pos < 0) {
            decryptedMsg.push(char);
        } else {
            pos = (pos + cipherKey) % letters.length;
            decryptedMsg.push(letters[pos]);
        }
    }

    return decryptedMsg.join('');
}


// Telephone Number Validator
/* exported telephoneCheck */
function telephoneCheck(str) {
    'use strict';

    // Returns true if a given string is a valid US phone number, false otherwise.

    // String representation of pattern for US phone number
    // Requires double backslash to model parenthesis,
    // because it will be passed to RegExp constructor
    let phoneNumRegexTempl = '(\\([0-9]{3}\\) ?|[0-9]{3}(-| )?)[0-9]{3}(-| )?[0-9]{4}$';

    // RegExp pattern to check if country number is provided
    const regexCountryCode = /^\d{1,2}( |\()/;

    if (regexCountryCode.test(str)) {

        // If there is country code, it must be 1 for US
        switch (regexCountryCode.exec(str)[0]) {
        case '1 ':
        case '1(':
            break;
        default:
            return false;
        }

    } else {
        phoneNumRegexTempl = `^${phoneNumRegexTempl}`;
    }

    return (new RegExp(phoneNumRegexTempl)).test(str);
}


// Cash Register
function convertNums(changeCollected, conversionFactor) {
    'use strict';

    // Convert integers in collected change back to floats.
    // Mutate (change values in place) and return a reference to the given array.

    let i = 0;

    for (i; i < changeCollected.length; i++) {
        changeCollected[i][1] /= conversionFactor;
    }

    return changeCollected;
}


function greedyChangeSearch(cid, denominations, cidTotal, changeTotal) {
    'use strict';

    /*
     * Input:
     *
     * cid -- 2D (nested) array, cash in a drawer
     *     -- inner arrays must have two elements:
     *        string denomination and numerical value in pennies
     *
     * denominations -- object with name and value in pennies of each denomination
     *
     * cidTotal -- all cash available in the cash register
     *
     * changeTotal -- change to collect
     *
     * Important assumption: cid must be in an ASCENDING order by the denomination.
     */

    // Starting position and the highest acceptable denomination
    // Should be highest required index since cid is sorted in lowest to highest denomination order
    let i;

    // Position of current denomination in cid, cannot be higher than i
    let j;

    let changeCollected;
    let cidCash;
    let changeRemaining;
    let denomName;
    let denomChange;

    mainLoop:
    for (i = cid.length - 1; i >= 0; i--) {
        denomName = cid[i][0];

        // Check if highest denomination is greater than overall change
        if (denominations[denomName] > changeTotal) {
            cidTotal -= cid[i][1]; // lower available cash
            continue;
        }

        changeCollected = [];
        cidCash = cidTotal;
        changeRemaining = changeTotal;

        // Loop through items in cid from highest to lowest denomination and try to collect change greedily
        for (j = i; j >= 0; j--) {

            // Check if there is enough cash left in the drawer
            if (cidCash < changeRemaining) {
                break;
            }

            if (cidCash === changeRemaining) {
                changeCollected.push(...cid.slice(0, j + 1).reverse());
                changeRemaining = 0;
                break mainLoop;
            }

            denomName = cid[j][0];
            denomChange = 0;

            // Check if all cash in current denomination can be given as the change
            if (cid[j][1] < changeRemaining) {

                denomChange = cid[j][1];

            // Check if current denomination itself is not greater than residual change
            } else if (denominations[denomName] <= changeRemaining) {

                // Calculata maximum amount that can be given as the change in current denomination
                denomChange = (changeRemaining / denominations[denomName] >> 0) * denominations[denomName];
            }

            if (denomChange > 0) {

                changeCollected.push([denomName, denomChange]);
                changeRemaining -= denomChange;

                if (changeRemaining === 0) {
                    break mainLoop;
                }
            }

            cidCash -= cid[j][1];
        } // end of inner loop

        // When cannot collect enough money to give the exact change, start with lower initial denomination
        cidTotal -= cid[i][1]; // lower available cash
    } // end of main loop

    return [changeRemaining, changeCollected];
}


/* exported checkCashRegister */
function checkCashRegister(price, cash, cid) {
    'use strict';

    /*
     * Input:
     * price -- number, purchase price
     * cash -- number, payment
     * cid -- 2D (nested) array, cash in a drawer
     *     -- inner arrays must have two elements:
     *        string denomination and numerical value
     *
     * Assumption: cid must be in an ASCENDING order by the denomination.
     *
     * Return an object with two properties:
     * -- status -- string;
     * -- change -- empty array or array of the same structure as cid with the change due.
     */

    /*
     * Disclaimer:
     * This function uses greedy algorithm to solve the problem.
     * It is enough to pass all test cases from freeCodeCamp, although
     * it still can return incorrect answers.
     *
     * For instance, for inputs:
     * > price = 0.2
     * > cash = 1.0
     * > cid = [
     * >     ['PENNY', 0.02],
     * >     ['DIME', 0.6],
     * >     ['QUARTER', 0.75],
     * >     ['ONE', 10],
     * >     ['ONE HUNDRED', 200]
     * > ]
     * checkCashRegister(price, cash, cid) should return
     * > { status: 'OPEN', change: [['QUARTER', 0.5], ['DIME', 0.3]] }
     * instead, it actually returns
     * > { status: 'INSUFFICIENT_FUNDS', change: [] }
     */

    const result = {
        status: '',
        change: []
    };

    if (price > cash) {
        return result;
    }

    const msg = {
        empty: 'CLOSED', // no more money in the cash register
        fail: 'INSUFFICIENT_FUNDS', // cannot return the exact change
        success: 'OPEN'
    };

    const conversionFactor = 100;

    // Convert numbers to integers to avoid rounding errors
    // Convert all denominations to their equivalents in pennies
    price = price * conversionFactor >> 0;
    cash = cash * conversionFactor >> 0;

    // Do not mutate the original array, preserve order
    cid = cid.map(denom => [denom[0], denom[1] * conversionFactor >> 0]);

    // Sum of all cash in the cash register
    const cidTotal = cid.reduce((sum, denom) => sum + denom[1], 0);

    const changeTotal = cash - price;

    if (cidTotal < changeTotal) {
        result.status = msg.fail;
        return result;
    }

    if (cidTotal === changeTotal) {
        result.status = msg.empty;
        result.change = convertNums(cid, conversionFactor);
        return result;
    }

    // Denominations and their values, in pennies
    const denominations = {
        'PENNY': 1,
        'NICKEL': 5,
        'DIME': 10,
        'QUARTER': 25,
        'ONE': 100,
        'FIVE': 500,
        'TEN': 1000,
        'TWENTY': 2000,
        'ONE HUNDRED': 10000
    };

    const [changeRemaining, changeCollected] = greedyChangeSearch(cid, denominations, cidTotal, changeTotal);

    if (changeRemaining === 0) {
        result.status = msg.success;
        result.change = convertNums(changeCollected, conversionFactor);
    } else {
        result.status = msg.fail;
    }

    return result;
}

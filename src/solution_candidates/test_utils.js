/* eslint-env node, amd */


const { readFileSync: fsReadFileSync } = require('fs');
const { join: pathJoin } = require('path');


function loadTestCases(functionName) {
    'use strict';

    /*
     * Input:
     * functionName -- string
     *
     * Return an array with test cases (sub-arrays) for the given function.
     */

    const filePath = pathJoin(__dirname, 'test_data.json');
    const testData = JSON.parse(fsReadFileSync(filePath));
    const testCases = testData[functionName] ? testData[functionName].cases : undefined;

    if (!Array.isArray(testCases) || testCases.length === 0) {
        throw new Error(`No test cases for ${functionName}`);
    }

    return testCases;
}


function formatString(text, substitutes) {
    'use strict';

    // Perform simple positional string formatting

    const placeholder = '{}';

    // Number of placeholder occurences
    const n = text.split(placeholder).length - 1;

    if (n === 0) {
        throw new Error('There is nothing to be substituted');
    } else if (!Array.isArray(substitutes)) {
        throw new Error('Substitutes must be placed in an array');
    } else if (substitutes.some(sub => `${sub}`.includes(placeholder))) {
        throw new Error(`Substitutes cannot contain placeholder "${placeholder}"`);
    } else if (substitutes.length === n) {
        for (const sub of substitutes) {
            text = text.replace(placeholder, sub);
        }
    } else if (substitutes.length === 1) {
        text = text.replace(new RegExp(placeholder, 'g'), substitutes[0]);
    } else {
        throw new Error(`Cannot format "${text}" with [${substitutes}]`);
    }

    return text;
}


function printSummary(passed, total, seconds, nanoseconds) {
    'use strict';

    /* eslint no-console: "off" */

    /*
     * Inputs:
     * passed -- number of passed test cases
     * total -- number of all test cases
     * seconds -- number of seconds, test time
     * nanoseconds -- number of nanoseconds, remaining part of the test time
     *                that cannot be represented in second precision
     *
     * This function does not return any value,
     * just displays short test summary.
     */

    console.log(`Total time: ${seconds} sec ${nanoseconds / 1e6} msec`);
    console.log(`Test(s) passed: ${passed} / ${total}`);
}


module.exports = {
    loadTestCases,
    formatString,
    printSummary
};

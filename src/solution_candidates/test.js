#!usr/bin/node

'use strict';

/* eslint-env node, amd */
/* eslint no-console: "off" */


const {
    loadTestCases,
    formatString,
    printSummary
} = require('./test_utils.js');

const {
    add12Hours,
    equilibrium,
    maximumSubsequence
} = require('./RosettaCode.js');


function testSolution(fn, description, singleValue) {
    'use strict';

    /*
     * Input:
     * fn -- reference to a function
     * description -- string, a brief description of the tested function
     * singleValue -- boolean, when set to true, the tested function is expected
     *                to require one primitive value argument and return
     *                one primitive value, otherwise the tested function
     *                should have one array of primitives argument and return
     *                one array of primitives
     *
     * General test for a simple function with either
     * one single primitive value input and one single primitive value output
     * or one input array of primitives and one output array of primitives.
     *
     * This function does not return any value.
     */

    console.log(`\nTesting ${fn.name} function\n(${description})`);

    const testCases = loadTestCases(fn.name);

    let check;
    let errMsgTempl;

    if (singleValue) {
        check = (answer, output) => answer === output;
        errMsgTempl = '- test {} failed: expected {}, got {}';
    } else {
        check = (answer, output) => Array.isArray(output)
            && answer.length === output.length
            && answer.every((v, i) => v === output[i]);
        errMsgTempl = '- test {} failed: expected [{}], got [{}]';
    }

    let arg;
    let ans;
    let out;

    let pass = 0;
    let i = 0;
    let t = process.hrtime();

    for (i; i < testCases.length; i++) {

        [arg, ans] = testCases[i];
        out = fn(arg);

        if (check(ans, out)) {
            pass++;
        } else {
            console.warn(formatString(errMsgTempl, [i, ans, out]));
        }
    }

    t = process.hrtime(t);
    printSummary(pass, testCases.length, ...t);
}


function runTests() {
    'use strict';

    testSolution(add12Hours, 'Rosetta Code: Date manipulation problem', true);
    testSolution(equilibrium, 'Rosetta Code: Equilibrium index problem', false);
    testSolution(maximumSubsequence, 'Rosetta Code: Greatest subsequential sum problem', false);
}


runTests();

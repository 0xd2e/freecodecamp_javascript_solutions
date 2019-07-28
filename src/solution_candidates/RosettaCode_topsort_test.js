#!usr/bin/node

'use strict';

/* eslint-env node, amd */
/* eslint no-console: "off" */


const { printSummary } = require('./test_utils.js');

const {
    buildGraphFromText,
    invertKeys,
    countDegrees,
    topologicalSort,
    recursiveTopologicalSort
} = require('./RosettaCode_topsort.js');


function shuffleArray(arr) {
    'use strict';

    // Randomize elements of the given array using
    // Durstenfeld shuffle (optimized version of Fisher-Yates shuffle)
    // Based on: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm

    // Make a copy, do not change the original array
    arr = [...arr];

    let i = arr.length - 1;
    let j;

    for (i; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}


function loadTestData() {
    'use strict';

    /*
     * Retrun an array of objects. Every object has "input", "inDegreesAnswer",
     * "outDegreesAnswer", and "topsortAnswers" properties. The returned object
     * can have optional "source" property.
     */

    // Test data contains only Directed Acyclic Graphs
    const testData = [
        {
            input: ['A B C', 'B C'],
            inDegreesAnswer: { A: 2, B: 1, C: 0 },
            outDegreesAnswer: { A: 0, B: 1, C: 2 },
            topsortAnswers: ['C B A']
        },
        {
            input: ['A B C', 'C D', 'D E', 'B D'],
            inDegreesAnswer: { B: 1, A: 2, C: 1, E: 0, D: 1 }, // eslint-disable-line object-curly-newline
            outDegreesAnswer: { B: 1, A: 0, C: 1, E: 1, D: 2 }, // eslint-disable-line object-curly-newline
            topsortAnswers: ['E D C B A', 'E D B C A']
        },
        {
            source: 'https://www.gatevidyalay.com/topological-sort-topological-sorting/',
            input: ['P Q R', 'R Q', 'S R Q'],
            inDegreesAnswer: { R: 1, S: 2, Q: 0, P: 2 }, // eslint-disable-line object-curly-newline
            outDegreesAnswer: { R: 2, S: 0, Q: 3, P: 0 }, // eslint-disable-line object-curly-newline
            topsortAnswers: ['Q R P S', 'Q R S P']
        },
        {
            source: 'https://www.gatevidyalay.com/topological-sort-topological-sorting/',
            input: ['1 2 3', '2 4 5', '3 4 6', '4 5 6'],
            inDegreesAnswer: { 1: 2, 4: 2, 3: 2, 2: 2, 5: 0, 6: 0 }, // eslint-disable-line object-curly-newline
            outDegreesAnswer: { 1: 0, 4: 2, 3: 1, 2: 1, 5: 2, 6: 2 }, // eslint-disable-line object-curly-newline
            topsortAnswers:
            [
                '6 5 4 2 3 1',
                '6 5 4 3 2 1',
                '5 6 4 2 3 1',
                '5 6 4 3 2 1'
            ]
        },
        {
            source: 'https://www.geeksforgeeks.org/all-topological-sorts-of-a-directed-acyclic-graph/',
            input: ['5 2 0', '4 0 1', '2 3', '3 1'],
            inDegreesAnswer: { 4: 2, 1: 0, 5: 2, 2: 1, 0: 0, 3: 1 }, // eslint-disable-line object-curly-newline
            outDegreesAnswer: { 4: 0, 1: 2, 5: 0, 2: 1, 0: 2, 3: 1 }, // eslint-disable-line object-curly-newline
            topsortAnswers:
            [
                '0 1 3 2 5 4',
                '0 1 3 2 4 5',
                '0 1 3 4 2 5',
                '0 1 4 3 2 5',
                '1 3 2 0 5 4',
                '1 3 2 0 4 5',
                '1 3 0 4 2 5',
                '1 3 0 2 5 4',
                '1 3 0 2 4 5',
                '1 0 4 3 2 5',
                '1 0 3 2 5 4',
                '1 0 3 2 4 5',
                '1 0 3 4 2 5'
            ]
        }
    ];

    return testData;
}


function loadCountDegreesTestCases() {
    'use strict';

    /*
     * Retrun two dimensional array. Every subarray has three items:
     * 0. Map object, a graph represented as an adjacency list,
     *    with successor keys and sets of direct dependencies as values,
     * 1. answer object with expected indegrees,
     * 2. answer object with expected outdegrees.
     */

    const testData = loadTestData();
    const cases = [];

    let input;
    let inDegreesAnswer;
    let outDegreesAnswer;
    let graph;

    for (const testCase of testData) {

        // Use parenthesis to show JavaScript that it is
        // an assignment expression and not a code block
        ({ input, inDegreesAnswer, outDegreesAnswer } = testCase);

        graph = buildGraphFromText(input.join('\n'));
        cases.push([graph, inDegreesAnswer, outDegreesAnswer]);
    }

    return cases;
}


function testCountDegrees(testCases, examineIndegrees, successorKeys) {
    'use strict';

    /*
     * Input:
     *
     * testCases -- array of three-element arrays, arguments and answers
     *
     * examineIndegrees -- boolean
     *  -- test indegrees (number of direct predecessors) when true
     *  -- test outdegrees (number of direct successors) when false
     *
     * successorKeys -- boolean, determine how to interpret keys and values in the graph
     * -- true for a graph with successors as its keys and sets of predecessors as values
     * -- false for a graph with predecessors as its keys and sets of successors as values
     *
     *
     * This function does not return any value.
     */

    const testDescription = [
        '\nTesting \'countDegrees\' function for correct output\n',
        `(${examineIndegrees ? 'ingedrees' : 'outgedrees'} for a graph with`,
        ` ${successorKeys ? 'successors' : 'predecessors'} as keys)`
    ].join('');

    console.log(testDescription);

    const check = (ans, out) => {
        if (typeof out !== 'object') return false;
        if (Object.keys(ans).length !== Object.keys(out).length) return false;
        for (const node in ans) {
            if (ans[node] !== out[node]) return false; // compare numeric values
        }
        return true;
    };

    let graph;
    let answer;
    let output;
    let passed = 0;
    let i = 0;
    const t = process.hrtime();

    for (i; i < testCases.length; i++) {

        if (examineIndegrees) {
            [graph, answer] = testCases[i];
        } else {
            [graph, , answer] = testCases[i];
        }

        output = countDegrees(graph, examineIndegrees, successorKeys);

        if (check(answer, output)) {
            passed++;
        } else {
            console.warn(`- test ${i} failed:`);
            console.warn('  expected', answer);
            console.warn('  got     ', output);
        }
    }

    const [seconds, nanoseconds] = process.hrtime(t);

    printSummary(passed, testCases.length, seconds, nanoseconds);
}


function runCountDegreesTests() {
    'use strict';

    // Test all configurations of arguments in countDegrees function

    const testCases = loadCountDegreesTestCases();

    testCountDegrees(testCases, true, true);
    testCountDegrees(testCases, false, true);

    for (const subArr of testCases) {
        subArr[0] = invertKeys(subArr[0]);
    }

    testCountDegrees(testCases, false, false);
    testCountDegrees(testCases, true, false);
}


function loadTopologicalSortTestCases() {
    'use strict';

    /*
     * Retrun two dimensional array. Every subarray has two items:
     * 0. string, argument to a tested function,
     * 1. array of strings, all valid topological orders.
     */

    const testData = loadTestData();
    const cases = [];

    let arg;
    let ans;
    let i;

    for (const testCase of testData) {

        // Use parenthesis to show JavaScript that it is
        // an assignment expression and not a code block
        ({ input: arg, topsortAnswers: ans } = testCase);
        cases.push([arg.join('\n'), ans]);

        // If order of lines in the input array changes, the function should
        // still return a valid topological sorting for a Directed Acyclic Graph.

        // Number of all permutations without repetition (distinct arrangements)
        // of items in the input array is a factorial of its length.

        if (arg.length > 2) {
            for (i = 1; i < arg.length; i++) {
                cases.push([shuffleArray(arg).join('\n'), ans]);
            }
        }
    }

    return cases;
}


function testTopologicalSort(fn, useAnswers) {
    'use strict';

    /*
     * Input:
     * fn -- reference to a function
     * useAnswers -- boolean, method of evaluation
     *            -- compare the output against predefinead answers when true
     *            -- check relative order of items in the output when false
     *
     * This function does not return any value.
     */

    const testDescription = [
        `\nTesting '${fn.name}' function for correct output`,
        '\n(Rosetta Code: Topological sort problem)'
    ].join('');

    console.log(testDescription);

    const testCases = loadTopologicalSortTestCases();

    let arg;
    let ans;
    let out;

    // Because a result of topological sort is not unique, check if a result
    // of sorting function is one of a possible valid sequences
    const checkAnswers = () => {
        if (!Array.isArray(out)) return false;
        const stringified = out.join(' ');
        return ans.some(value => value === stringified);
    };

    // Check if a node comes after the node(s) it points to / depends on
    const checkOrder = () => {

        if (!Array.isArray(out)) return false;

        const graph = buildGraphFromText(arg);
        let currNode;
        let outEdges;
        let outNode;
        let currNodeIndex;

        for ([currNode, outEdges] of graph.entries()) {
            currNodeIndex = out.indexOf(currNode);
            for (outNode of outEdges) {
                if (out.indexOf(outNode) >= currNodeIndex) return false;
            }
        }

        return true;
    };

    const check = useAnswers ? checkAnswers : checkOrder;
    const newLineRegExp = /\n/g;
    let passed = 0;
    let i = 0;
    const t = process.hrtime();

    for (i; i < testCases.length; i++) {

        [arg, ans] = testCases[i];
        out = fn(arg);

        if (check()) {
            passed++;
        } else {
            console.warn(`- test ${i} failed: got [${out}] for "${arg.replace(newLineRegExp, ', ')}"`);
        }
    }

    const [seconds, nanoseconds] = process.hrtime(t);

    printSummary(passed, testCases.length, seconds, nanoseconds);
}


function runTests() {
    'use strict';

    console.log('\nRunning test set for Rosetta Code - Topological sort problem');

    const t = process.hrtime();

    runCountDegreesTests();
    testTopologicalSort(recursiveTopologicalSort, false);
    testTopologicalSort(topologicalSort, false);

    const [seconds, nanoseconds] = process.hrtime(t);

    console.log(`\nTotal time: ${seconds} sec ${nanoseconds / 1e6} msec`);
}


runTests();

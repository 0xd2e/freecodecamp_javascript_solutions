/*
 * ROSETTA CODE
 * Topological sort
 * https://learn.freecodecamp.org/coding-interview-prep/rosetta-code/topological-sort/
 *
 *
 * Some basic graph terminology:
 * X, Y     : vertices/nodes
 * X -> Y   : arrow/edge from X to Y
 * X        : tail, direct predecessor of Y
 * Y        : head, direct successor of X
 * indegree : number of heads adjacent to a vertex/node
 *            number of direct predecessors
 * outdegree: number of tails adjacent to a vertex/node
 *            number of direct successors
 * source   : vertex/node with indegree zero
 * sink     : vertex/node with outdegree zero
 * Based on : https://en.wikipedia.org/wiki/Directed_graph
 *
 *
 * Assumptions/conventions/notes:
 * -- every direct dependency of a library is its predecessor
 *    from the perspective of a compiler, therefore, libraries
 *    with no dependencies have indegree zero
 * -- problem with cycle(s) in a graph (un-orderable dependencies)
 *    is not yet fully resolved
 */


/* eslint-env node, amd */


function buildGraphFromText(str) {
    'use strict';

    /*
     * Input:
     * str -- string, list of libraries
     *     -- each library, together with its dependencies,
     *        must be placed in one single line
     *     -- if dependencies are split between multiple lines,
     *        they will be overwritten instead of merged
     *     -- library name must be a single word
     *     -- library names within a line must be separated
     *        by at least one space
     *
     * Retrun a Map object, a graph represented as an adjacency list,
     * where every key is a library (successor) and corresponding value
     * is a set of its dependencies (libraries it depends on).
     */

    const graph = new Map();
    const spacesRegExp = / +/;
    let dependenciesList;
    let dependenciesSet;
    let library;

    for (const line of str.trim().split('\n')) {
        if (!line) continue; // omit empy lines
        [library, ...dependenciesList] = line.trim().split(spacesRegExp);
        dependenciesSet = new Set(dependenciesList);
        dependenciesSet.delete(library); // ignore self dependencies
        graph.set(library, dependenciesSet);
    }

    const collection = new Set();

    // Gather libraries with no dependencies that are not listed explicitly
    for (dependenciesSet of graph.values()) {
        for (library of dependenciesSet) {
            if (!graph.has(library)) {
                collection.add(library);
            }
        }
    }

    for (library of collection) {
        graph.set(library, new Set());
    }

    return graph;
}


function invertKeys(graph) {
    'use strict';

    /*
     * Input:
     * graph -- Map object, a graph represented as an adjacency list
     *
     * Retrun a Map object, a graph represented as an adjacency list,
     * where every key is a library (predecessor) and corresponding value
     * is a set of libraries that depends on it.
     */

    const inverted = new Map();
    let currNode;
    let outEdges;
    let outNode;

    for (currNode of graph.keys()) {
        inverted.set(currNode, new Set());
    }

    for ([currNode, outEdges] of graph.entries()) {
        for (outNode of outEdges) {
            inverted.get(outNode).add(currNode);
        }
    }

    return inverted;
}


function countDegrees(graph, returnIndegrees, successorKeys) {
    'use strict';

    /*
     * Input:
     *
     * graph -- Map object, a graph represented as an adjacency list
     *
     * returnIndegrees -- boolean
     *  -- return indegrees (number of direct predecessors) when true
     *  -- return outdegrees (number of direct successors) when false
     *
     * successorKeys
     * -- boolean, determine how to interpret keys and values in the graph
     * -- true for a graph with successors as its keys and sets of predecessors as values
     * -- false for a graph with predecessors as its keys and sets of successors as values
     *
     *
     * Retrun an object where keys represent nodes
     * and numeric values are either indegrees or outdegrees.
     */

    const degrees = {};
    let currNode;
    let adjacentEdges;

    if ((returnIndegrees && successorKeys) || !(returnIndegrees || successorKeys)) {

        // Calculate indegrees if graph uses predecessors as its keys
        // Calculate outdegrees if graph uses successors as its keys
        for ([currNode, adjacentEdges] of graph.entries()) {
            degrees[currNode] = adjacentEdges.size;
        }

    } else {

        // Calculate indegrees if graph uses successors as its keys
        // Calculate outdegrees if graph uses predecessors as its keys
        for ([currNode, adjacentEdges] of graph.entries()) {
            if (!degrees.hasOwnProperty(currNode)) {
                degrees[currNode] = 0;
            }
            for (currNode of adjacentEdges) {
                degrees[currNode] = degrees[currNode] + 1 || 1;
            }
        }
    }

    return degrees;
}


function findZeroDegreeNodes(degrees) {
    'use strict';

    /*
     * Input:
     * degrees -- object where keys represent nodes and values corresponding
     *            degrees (they can be either indegrees or outdegrees)
     *
     * Retrun an array of strings, a list of:
     * -- source node(s) when indegrees were given,
     * -- sink node(s) when outdegrees were given.
     *
     * The source vertex is a vertex with indegree zero.
     * Every Directed Acyclic Graph has at least one source vertex.
     * The sink vertex is a vertex with outdegree zero.
     */

    return Object.keys(degrees).filter(node => degrees[node] === 0);
}


function topologicalSort(libs) {
    'use strict';

    /*
     * Input:
     * libs -- string, list of libraries
     *      -- each library, together with its dependencies,
     *         must be placed in one single line
     *      -- if dependencies are split between multiple lines,
     *         they will be overwritten instead of merged
     *      -- library name must be a single word
     *      -- library names within a line must be separated
     *         by at least one space
     *
     * Retrun an array of strings, a valid compile order
     * (topological sorting) of libraries from their dependencies.
     */

    // Kahn's algorithm
    // Based on: https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm

    const graph = invertKeys(buildGraphFromText(libs));
    const indegrees = countDegrees(graph, true, false);
    const sourcekNodes = findZeroDegreeNodes(indegrees); // queue (fifo)
    const orderedLibraries = new Set();

    let currNode;
    let nextNode; // direct successor

    while (sourcekNodes.length > 0) {
        currNode = sourcekNodes.shift();
        orderedLibraries.add(currNode);

        // Decrease indegree of all leaf nodes
        for (nextNode of graph.get(currNode)) {
            if (--indegrees[nextNode] === 0) {
                sourcekNodes.push(nextNode);
            }
        }
    }

    // Check if there was a cycle
    for (const indeg of Object.values(indegrees)) {
        if (indeg !== 0) {
            return [];
        }
    }

    return [...orderedLibraries];
}


module.exports = {
    buildGraphFromText,
    invertKeys,
    countDegrees,
    findZeroDegreeNodes,
    topologicalSort
};

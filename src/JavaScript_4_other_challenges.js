'use strict';

/*
 * 1. Find the Symmetric Difference
 * https://learn.freecodecamp.org/coding-interview-prep/algorithms/find-the-symmetric-difference/
 *
 * 2. Inventory Update
 * https://learn.freecodecamp.org/coding-interview-prep/algorithms/inventory-update
 *
 * 3. No Repeats Please
 * https://learn.freecodecamp.org/coding-interview-prep/algorithms/no-repeats-please
 *
 * 4. Pairwise
 * https://learn.freecodecamp.org/coding-interview-prep/algorithms/pairwise
 *
 * 5. Create a Circular Queue
 * https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-circular-queue/
 */


// Find the Symmetric Difference
/* exported sym */
function sym(...args) {

    // From both sets remove common elements so that each set contains only unique values.

    let set1 = new Set(args[0]);
    let i = 1;

    let elem;
    let set2;

    for (i; i < args.length; i++) {

        set2 = new Set(args[i]);

        for (elem of set1) {
            if (set2.delete(elem)) {
                set1.delete(elem);
            }
        }

        // Merge both sets
        set1 = new Set([...set1, ...set2]);
    }

    return [...set1];
}


// Inventory Update
/* exported updateInventory */
function updateInventory(curInv, newInv) {

    // Mutate (change values in place) and return a reference to the given current inventory list.

    const curInvItemNames = curInv.map((item) => item[1]);

    let item;
    let i;

    for (item of newInv) {
        i = curInvItemNames.indexOf(item[1]);
        if (i < 0) {
            // curInv.push(item.slice());
            curInv.push([...item]);
            curInvItemNames.push(item[1]);
        } else {
            curInv[i][0] += item[0];
        }
    }

    // eslint-disable-next-line no-confusing-arrow
    return curInv.sort((a, b) => a[1] > b[1] ? 1 : -1);
}


// No Repeats Please
function generatePermutations(str) {

    // Heap's algorithm: https://en.wikipedia.org/wiki/Heap%27s_algorithm

    const n = str.length;
    const a = str.split('');
    const c = Array(n).fill(0);
    const output = [str];

    let i = 0;

    while (i < n) {
        if (c[i] < i) {

            if (!(i & 1)) {
                [a[0], a[i]] = [a[i], a[0]];
            } else {
                [a[c[i]], a[i]] = [a[i], a[c[i]]];
            }

            output.push(a.join(''));

            c[i]++;
            i = 0;

        } else {
            c[i++] = 0;
        }
    }

    return output;
}


function factorialize(num) {

    let result = 1;

    for (num; num > 1; num--) {
        result *= num;
    }

    return result;
}


/* exported permAlone */
function permAlone(str) {

    // Count the number of unique characters
    let n = (new Set(str)).size;

    if (n === str.length) {
        return factorialize(n);
    }

    if (n === 1) {
        return 0;
    }

    const permutations = generatePermutations(str);

    // Check for repeated consecutive letter (double character)
    const doubleCharRegex = /(\w)\1/;

    n = 0;

    for (str of permutations) {
        if (!doubleCharRegex.test(str)) n++;
    }

    return n;
}


// Pairwise
/* exported pairwise */
function pairwise(arr, arg) {

    const indexes = [];
    const len = arr.length;

    let i;
    let j;

    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] + arr[j] === arg && !indexes.includes(i) && !indexes.includes(j)) {
                indexes.push(i, j);
                break;
            }
        }
    }

    return indexes.reduce((sum, num) => sum + num, 0);
}


// Create a Circular Queue
/* exported CircularQueue */
class CircularQueue {

    constructor(size) {
        this.queue = Object.seal(new Array(size).fill(null));
        this.read = 0; // front / head position
        this.write = 0; // rear / tail position
        this.max = size - 1;
    }

    print() {
        return this.queue;
    }

    enqueue(item) {

        // Check if queue is full
        if (this.write === this.read - 1) {
            return null;
        }

        this.queue[this.write] = item;

        if (this.write === this.max) {
            // Prevent overwriting the existing data at the beginning of the cycle
            this.write = (this.read === 0) ? -1 : 0;
        } else {
            this.write++;
        }

        return item;
    }

    dequeue() {

        // Check if queue is empty
        if (this.read === this.write) {
            return null;
        }

        const item = this.queue[this.read];
        this.queue[this.read] = null;

        if (this.read === this.max) {
            this.read = 0;
        } else {
            this.read++;

            // Check if the queue was stucked / full at the beginning of the cycle
            if (this.read === 1 && this.write === -1) {
                this.write = 0; // release the write pointer
            }
        }

        return item;
    }

}

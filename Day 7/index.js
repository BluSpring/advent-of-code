const start = Date.now();

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let sum = 0;

const lines = input.split('\n');

(() => {
    const strengths = 'AKQJT98765432'.split('');

    let types = {};
    let bids = {};

    /**
     * 
     * @param {string} hand 
     */
    function scanMatches(hand) {
        let totals = {};

        for (const char of hand) {
            if (!totals[char])
                totals[char] = 0;

            totals[char]++;
        }

        return totals;
    }

    function result(map, index) {
        return map[Object.keys(map)[index]];
    }

    for (const line of lines) {
        if (line.trim() == '')
            continue;

        const split = line.split(' ');
        const hand = split[0];
        const bid = split[1];
        bids[hand] = bid;

        const matches = scanMatches(hand);

        if (result(matches, 0) == 5) { // five of a kind
            types[hand] = 6;
        } else if (result(matches, 0) == 4 || result(matches, 1) == 4) { // four of a kind
            types[hand] = 5;
        } else if ((result(matches, 0) == 3 && result(matches, 1) == 2) || (result(matches, 0) == 2 && result(matches, 1) == 3)) { // full house
            types[hand] = 4;
        } else if (result(matches, 0) == 3 || result(matches, 1) == 3 || result(matches, 2) == 3) { // three of a kind
            types[hand] = 3;
        } else if ((result(matches, 0) == 2 && result(matches, 1) == 2) || (result(matches, 1) == 2 && result(matches, 2) == 2) || (result(matches, 0) == 2 && result(matches, 2) == 2)) { // two pair
            types[hand] = 2;
        } else if ((result(matches, 0) == 2) || (result(matches, 1) == 2) || (result(matches, 2) == 2) || (result(matches, 3) == 2) || (result(matches, 4) == 2)) { // one pair
            types[hand] = 1;
        } else {
            types[hand] = 0;
        }
    }

    function isStronger(source, compare) {
        for (let i = 0; i < 5; i++) {
            if (strengths.indexOf(source[i]) < strengths.indexOf(compare[i]))
                return true;
            else if (strengths.indexOf(source[i]) > strengths.indexOf(compare[i]))
                return false;
        }

        return false;
    }

    const sortedHands = Object.keys(types).sort((a, b) => {
        if (types[a] > types[b])
            return 1;
        else if (types[b] > types[a])
            return -1;
        else if (isStronger(a, b))
            return 1;
        else if (isStronger(b, a))
            return -1;
        else
            return 0;
    });

    for (let i = 0; i < sortedHands.length; i++) {
        const hand = sortedHands[i];
        const bid = bids[hand];
        sum += bid * (i + 1);
    }

    console.log(`sum: ${sum}`);
    console.log(`took ${Date.now() - start}ms`);
})();

// Day 2
(() => {
    sum = 0;
    const strengths = 'AKQT98765432J'.split('');

    let types = {};
    let bids = {};

    /**
     * 
     * @param {string} hand 
     */
    function scanMatches(hand) {
        let totals = {};

        for (const char of hand) {
            if (!totals[char])
                totals[char] = 0;

            totals[char]++;
        }

        if (!!totals['J']) {
            const jokers = totals['J'];

            const mostPossible = Object.keys(totals).filter(b => b != 'J').sort((a, b) => totals[b] - totals[a])[0];

            if (!!mostPossible) {
                delete totals['J'];
                totals[mostPossible] += jokers;
            }
        }

        return totals;
    }

    function result(map, index) {
        return map[Object.keys(map)[index]];
    }

    for (const line of lines) {
        if (line.trim() == '')
            continue;

        const split = line.split(' ');
        const hand = split[0];
        const bid = split[1];
        bids[hand] = bid;

        const matches = scanMatches(hand);

        if (result(matches, 0) == 5) { // five of a kind
            types[hand] = 6;
        } else if (result(matches, 0) == 4 || result(matches, 1) == 4) { // four of a kind
            types[hand] = 5;
        } else if ((result(matches, 0) == 3 && result(matches, 1) == 2) || (result(matches, 0) == 2 && result(matches, 1) == 3)) { // full house
            types[hand] = 4;
        } else if (result(matches, 0) == 3 || result(matches, 1) == 3 || result(matches, 2) == 3) { // three of a kind
            types[hand] = 3;
        } else if ((result(matches, 0) == 2 && result(matches, 1) == 2) || (result(matches, 1) == 2 && result(matches, 2) == 2) || (result(matches, 0) == 2 && result(matches, 2) == 2)) { // two pair
            types[hand] = 2;
        } else if ((result(matches, 0) == 2) || (result(matches, 1) == 2) || (result(matches, 2) == 2) || (result(matches, 3) == 2) || (result(matches, 4) == 2)) { // one pair
            types[hand] = 1;
        } else {
            types[hand] = 0;
        }
    }

    function isStronger(source, compare) {
        for (let i = 0; i < 5; i++) {
            if (strengths.indexOf(source[i]) < strengths.indexOf(compare[i]))
                return true;
            else if (strengths.indexOf(source[i]) > strengths.indexOf(compare[i]))
                return false;
        }

        return false;
    }

    const sortedHands = Object.keys(types).sort((a, b) => {
        if (types[a] > types[b])
            return 1;
        else if (types[b] > types[a])
            return -1;
        else if (isStronger(a, b))
            return 1;
        else if (isStronger(b, a))
            return -1;
        else
            return 0;
    });

    for (let i = 0; i < sortedHands.length; i++) {
        const hand = sortedHands[i];
        const bid = bids[hand];
        sum += bid * (i + 1);
    }

    console.log(`sum: ${sum}`);
    console.log(`took ${Date.now() - start}ms`);
})();
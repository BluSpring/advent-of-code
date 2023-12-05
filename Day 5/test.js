const start = Date.now();

const fs = require('fs');
const test = fs.readFileSync('./test.txt').toString();
const testValue = 35;

let seeds = [];
let maps = [];
let sum = 0;

// [[dest, src, len]]
let current = [];

for (const line of test.split('\n')) {
    if (line.trim() == '')
        continue;

    if (line.startsWith('seeds: ')) {
        for (const seed of line.replace('seeds: ', '').split(' ')) {
            seeds.push(parseInt(seed));
        }
        continue;
    }

    if (line.trim().endsWith('map:') && current.length != 0) {
        maps.push(current);
        current = [];
        continue;
    }

    let arr = [];
    for (const num of line.split(' ')) {
        arr.push(parseInt(num));
    }

    current.push(arr);
}

maps.push(current);
current = [];

let locations = [];

function findMapped(num, mappings) {
    let found = num;

    for (const map of mappings) {
        if (num >= map[1] && num < map[1] + map[2]) {
            const i = num - map[1];
            found = map[0] + i;
            break;
        }
    }

    return found;
}

for (const seed of seeds) {
    let currentMapping = seed;
    
    for (const map of maps) {
        currentMapping = findMapped(currentMapping, map);
    }

    locations.push(currentMapping);
}

sum = locations.sort((a, b) => a - b)[0];

console.log(`sum: ${sum} (${sum == testValue})`);
console.log(`took ${Date.now() - start}ms`);

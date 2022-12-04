const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString();

const split = data.split('\n');
const start = Date.now();

let elves = [];
let currentElf = 0;

for (const line of split) {
    if (line.trim() == '') {
        currentElf++;
        continue;
    }

    if (!elves[currentElf])
        elves[currentElf] = 0;

    elves[currentElf] += parseInt(line);
}

const sorted = elves.sort((a, b) => b - a);

// First Half
console.log(sorted[0]);
console.log(`took ${Date.now() - start}ms`);

// Second Half
console.log(sorted[0] + sorted[1] + sorted[2]);
console.log(`took ${Date.now() - start}ms`);
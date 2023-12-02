const start = Date.now();

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

// Game {id}: X red, X green; X blue, X red

const colors = ['red', 'green', 'blue'];
const idRegex = /Game (\d+): /;
const totalRegex = /(\d+) (red|green|blue)/;

let sum = 0;

for (const line of input.split('\n')) {
    if (line.trim() == '')
        continue;

    const id = parseInt(line.match(idRegex)[1]);
    const sets = line.replace(`Game ${id}: `, '');
    
    let highest = {};

    for (const set of sets.split('; ')) {
        let doubleCheck = {};

        for (const cube of set.split(', ')) {
            const match = cube.match(totalRegex);
            const total = parseInt(match[1]);
            const color = match[2];

            if (!doubleCheck[color])
                doubleCheck[color] = 0;

            doubleCheck[color] += total;
        }

        for (const color of colors) {
            if ((doubleCheck[color] ?? 0) > (highest[color] ?? 0)) {
                highest[color] = doubleCheck[color];
            }
        }
    }

    const red = highest['red'] ?? 0;
    const green = highest['green'] ?? 0;
    const blue = highest['blue'] ?? 0;

    if (red <= 12 && green <= 13 && blue <= 14) {
        sum += id;
    }
}

console.log(sum);
console.log(`took ${Date.now() - start}ms`);

// part 2

sum = 0;

for (const line of input.split('\n')) {
    if (line.trim() == '')
        continue;

    const id = parseInt(line.match(idRegex)[1]);
    const sets = line.replace(`Game ${id}: `, '');
    
    let highest = {};

    for (const set of sets.split('; ')) {
        let doubleCheck = {};

        for (const cube of set.split(', ')) {
            const match = cube.match(totalRegex);
            const total = parseInt(match[1]);
            const color = match[2];

            if (!doubleCheck[color])
                doubleCheck[color] = 0;

            doubleCheck[color] += total;
        }

        for (const color of colors) {
            if ((doubleCheck[color] ?? 0) > (highest[color] ?? 0)) {
                highest[color] = doubleCheck[color];
            }
        }
    }

    const red = highest['red'] ?? 0;
    const green = highest['green'] ?? 0;
    const blue = highest['blue'] ?? 0;

    sum += red * green * blue;
}

console.log(sum);
console.log(`took ${Date.now() - start}ms`);
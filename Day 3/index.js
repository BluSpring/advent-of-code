const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const start = Date.now();

let commons = [];

const split = input.split('\n');

for (const line of split) {
    if (line.trim() == '')
        continue;

    const firstHalf = line.substring(0, line.length / 2);
    const secondHalf = line.substring(line.length / 2);

    const common = firstHalf.split('').filter(a => secondHalf.includes(a))[0];

    commons.push(characters.indexOf(common) + 1);
}

console.log(commons.reduce((a, b) => a + b));

let commons2 = [];

for (let i = 0; i < split.length; i += 3) {
    const firstLine = split[i];
    const secondLine = split[i + 1];
    const thirdLine = split[i + 2];

    const common = firstLine.split('').filter(a => secondLine.includes(a) && thirdLine.includes(a))[0];

    commons2.push(characters.indexOf(common) + 1);
}

console.log(commons2.reduce((a, b) => a + b));

console.log(`Done in ${Date.now() - start}ms`);
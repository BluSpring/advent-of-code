const start = Date.now();

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

function getSum(data) {
    let sum = 0;

    for (const line of data.split('\n')) {
        const digits = line.replace(/[^0-9]/g, '');
        if (digits.trim() == '')
            continue;

        sum += parseInt(`${digits[0]}${digits[digits.length - 1]}`);
    }
    
    console.log(`sum: ${sum}`);
    console.log(`took ${Date.now() - start}ms`);
}

getSum(input);

// part 2
const normalMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

let doubledUp = {};

// why
for (const named of Object.keys(normalMap)) {
    for (const named2 of Object.keys(normalMap)) {
        if (named[named.length - 1] == named2[0]) {
            doubledUp[named + named2.substring(1)] = parseInt(`${normalMap[named]}${normalMap[named2]}`);
        }

        if (named[0] == named2[named.length - 1]) {
            doubledUp[named2 + named.substring(1)] = parseInt(`${normalMap[named2]}${normalMap[named]}`);
        }
    }
}

const map = Object.assign(doubledUp, normalMap);
console.log(map);

let replaced = input;

for (const named of Object.keys(map)) {
    replaced = replaced.replace(new RegExp(named, 'g'), map[named]);
}

fs.writeFileSync('./test.txt', replaced);

getSum(replaced);
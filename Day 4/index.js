const start = Date.now();

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

// Card {id}: 1 2 3 4 | 1 2 3 4

const idRegex = /Card(?:\s+)(\d+): /;

let sum = 0;

for (const line of input.split('\n')) {
    if (line.trim() == '')
        continue;
    
    const id = idRegex.exec(line)[1];
    
    const nums = line.replace(idRegex, '').split(' | ').map(a => a.split(' ').map(b => parseInt(b.trim())).filter(b => !isNaN(b)));

    let total = 0;
    for (const num of nums[0]) {
        if (nums[1].some(a => a == num)) {
            if (total == 0)
                total++;
            else
                total *= 2;
        }
    }

    sum += total;
}

console.log(`sum: ${sum}`);
console.log(`took ${Date.now() - start}ms`);

// Part 2

//const lines = fs.readFileSync('./test.txt').toString().split('\n');
const lines = input.split('\n');
sum = 0;

let cards = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() == '')
        continue;
    
    const id = idRegex.exec(line)[1];
    
    const nums = line.replace(idRegex, '').split(' | ').map(a => a.split(' ').map(b => parseInt(b.trim())).filter(b => !isNaN(b)));

    let found = [];
    for (const num of nums[0]) {
        if (nums[1].some(a => a == num)) {
            found.push(i + found.length + 1);
        }
    }

    cards[i] = found;
}

let total = Object.keys(cards).length;

function keepAddingMore(cardList) {
    for (const i of cardList) {
        total += cards[i].length;
        keepAddingMore(cards[i]);
    }
}

for (const cardList of Object.values(cards)) {
    total += cardList.length;
    keepAddingMore(cardList);
}

console.log(`sum: ${total}`);
console.log(`took ${Date.now() - start}ms`);
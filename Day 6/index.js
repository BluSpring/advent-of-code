const start = Date.now();

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let sum = 0;

const lines = input.split('\n');

const times = lines[0].split(/\s+/g).slice(1).filter(a => a != '').map(a => parseInt(a));
const recordDistances = lines[1].split(/\s+/g).slice(1).filter(a => a != '').map(a => parseInt(a));

let totalNumsToWin = [];

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const recordDistance = recordDistances[i];
    let distances = [];

    for (let holdTime = 0; holdTime <= time; holdTime++) {
        const totalMoveTime = time - holdTime;
        const totalDistanceMoved = totalMoveTime * holdTime;
        distances.push(totalDistanceMoved);
    }

    totalNumsToWin.push(distances.filter(a => a > recordDistance).length);
}

for (const num of totalNumsToWin) {
    if (sum == 0)
        sum = num;
    else
        sum *= num;
}

console.log(`sum: ${sum}`);
console.log(`took ${Date.now() - start}ms`);

// Part 2

sum = 0;

const time = parseInt(times.join(''));
const distance = parseInt(recordDistances.join(''));

for (let holdTime = 0; holdTime <= time; holdTime++) {
    const totalMoveTime = time - holdTime;
    const totalDistanceMoved = totalMoveTime * holdTime;
    
    if (totalDistanceMoved > distance)
        sum++;
}

console.log(`sum: ${sum}`);
console.log(`took ${Date.now() - start}ms`);
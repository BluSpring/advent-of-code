const start = Date.now();

const fs = require('fs');
const test = fs.readFileSync('./test.txt').toString();
const testValue = 288;
let sum = 0;

const lines = test.split('\n');

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

console.log(`sum: ${sum} (${sum == testValue})`);
console.log(`took ${Date.now() - start}ms`);
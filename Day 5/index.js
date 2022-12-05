const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString();

const isPart2 = true;
let inCratePhase = true;

const start = Date.now();

let crates = [];

const regex = /move (\d+) from (\d+) to (\d+)/;

for (const line of data.split('\n')) {
    if (inCratePhase) {
        if (!line.includes('[')) {
            inCratePhase = false;
            continue;
        }

        let j = 0;
        for (let i = 1; i < line.length; i += 4) {
            if (!crates[j])
                crates[j] = [];

            if (line[i].trim() == '') {
                j++;
                continue;
            }

            crates[j++].push(line[i]);
        }

        continue;
    }

    const parsed = regex.exec(line.trim());
    if (!parsed)
        continue;

    const crateAmount = parseInt(parsed[1]);
    const sourceStack = parseInt(parsed[2]);
    const destinationStack = parseInt(parsed[3]);

    const totalCrates = crates[sourceStack - 1].splice(0, crateAmount);

    if (isPart2)
        crates[destinationStack - 1].unshift(...totalCrates);
    else
        crates[destinationStack - 1].unshift(...totalCrates.reverse());
}

console.log(crates.map(a => a[0]).join(''));
console.log(`took ${Date.now() - start}ms`);
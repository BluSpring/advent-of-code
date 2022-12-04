const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString();

let totalOverlapping = 0;
let totalOnlyOverlap = 0;
const start = Date.now();

for (const line of data.split('\n')) {
    if (line.trim() == '')
        continue;

    const split = line.split(',');
    let pairs = [];

    for (const pair of split) {
        const sectionsSerialized = pair.split('-');
        let sections = [];

        for (let i = parseInt(sectionsSerialized[0]); i <= parseInt(sectionsSerialized[1]); i++) {
            sections.push(i);
        }

        pairs.push(sections);
    }

    let similarities = [];

    for (const section of pairs[0]) {
        if (pairs[1].includes(section)) {
            similarities.push(section);
        }
    }

    if (similarities.length > 0) {
        totalOnlyOverlap++;
    }

    if (similarities.length == pairs[1].length) {
        totalOverlapping++;
        continue;
    }

    similarities = [];

    for (const section of pairs[1]) {
        if (pairs[0].includes(section)) {
            similarities.push(section);
        }
    }

    if (similarities.length == pairs[0].length) {
        totalOverlapping++;
        continue;
    }
}

console.log(totalOverlapping);
console.log(totalOnlyOverlap);
console.log(`took ${Date.now() - start}ms`);
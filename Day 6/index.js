const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString();

const start = Date.now();

// i = 3 and i - 3 if part 1
for (let i = 13; i < data.length; i++) {
    const substr = data.substring(i - 13, i + 1);

    if ([...new Set(substr.split(''))].length != substr.length)
        continue;

    console.log(i + 1);
    break;
}

console.log(`took ${Date.now() - start}ms`);
const start = Date.now();

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const digitTest = /\d+/;

const lines = input.split('\n');

let sum = 0;

function isSymbol(char) {
    return (char ?? '.') != '.' && !digitTest.test(char ?? '.');
}

for (let i = 0; i < lines.length; i++) {
    const current = lines[i];
    const previous = lines[i - 1] ?? '.'.repeat(current.length);
    const next = lines[i + 1] ?? '.'.repeat(current.length);

    for (let j = 0; j < current.length; j++) {
        if (!digitTest.test(current[j]))
            continue;

        let number = '';
        for (let k = j; k < current.length; k++) {
            if (!digitTest.test(current[k]))
                break;

            number += current[k];
        }
        
        const start = j - 1;
        const end = j + number.length;

        for (let cursor = start; cursor <= end; cursor++) {
            if (isSymbol(previous[cursor]) || isSymbol(current[cursor]) || isSymbol(next[cursor])) {
                sum += parseInt(number);
                break;
            }
        }

        j += number.length - 1;
    }
}

console.log(`sum: ${sum}`);
console.log(`took ${Date.now() - start}ms`);

// Part 2

sum = 0;

function completeNum(line, index) {
    let number = line[index];

    let i = index;
    while (digitTest.test(line[--i])) {
        number = `${line[i]}${number}`;
    }

    i = index;

    while (digitTest.test(line[++i])) {
        number = `${number}${line[i]}`;
    }

    return parseInt(number);
}

function noneMatch(arr, num) {
    let anyMatch = false;

    for (const n of arr) {
        if (num == n) {
            anyMatch = true;
            break;
        }
    }

    return !anyMatch;
}

for (let i = 0; i < lines.length; i++) {
    const current = lines[i];
    const previous = lines[i - 1] ?? '.'.repeat(current.length);
    const next = lines[i + 1] ?? '.'.repeat(current.length);

    for (let j = 0; j < current.length; j++) {
        if (current[j] != '*')
            continue;

        let nums = [];

        for (let x = j - 1; x <= j + 1; x++) {
            if (digitTest.test(current[x])) {
                const num = completeNum(current, x);
                if (noneMatch(nums, num))
                    nums.push(num);
            }

            if (digitTest.test(previous[x])) {
                const num = completeNum(previous, x);
                if (noneMatch(nums, num))
                    nums.push(num);
            }

            if (digitTest.test(next[x])) {
                const num = completeNum(next, x);
                if (noneMatch(nums, num))
                    nums.push(num);
            }
        }

        if (nums.length == 2) {
            console.log(nums);
            sum += nums[0] * nums[1];
        } else if (nums.length > 2) {
            console.log(nums);
        }
    }
}

console.log(`sum: ${sum}`);
console.log(`took ${Date.now() - start}ms`);
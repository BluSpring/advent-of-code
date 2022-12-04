const fs = require ('fs');
const input = fs.readFileSync('./input.txt').toString();

const mapping = {
    // opponent
    'A': 'rock',
    'B': 'paper',
    'C': 'scissors',

    // me
    'X': 'rock',
    'Y': 'paper',
    'Z': 'scissors'
};

// 0 - loss, 3 - draw, 6 - win

function getScore(l, r) {
    if (!l || !r)
        return 0;

    let score;

    switch (l + r) {
        case 'AX':
        case 'BY':
        case 'CZ':
            score = 3;
            break;

        case 'AZ':
        case 'BX':
        case 'CY':
            score = 0;
            break;

        default:
            score = 6;
            break;
    }

    //console.log(`${mapping[l]} ${score == 0 ? 'loses' : score == 3 ? 'draws' : 'wins'} ${mapping[r]}`);

    switch (r) {
        case 'X':
            score += 1;
            break;
        case 'Y':
            score += 2;
            break;
        case 'Z':
            score += 3;
            break;
    }

    //console.log(`Total score: ${score}`);

    return score;
}

function getScore2(l, r) {
    if (!l || !r)
        return 0;

    let score;

    switch (l + r) {
        case 'AY':
        case 'BY':
        case 'CY':
            score = 3;
            break;

        case 'AX':
        case 'BX':
        case 'CX':
            score = 0;
            break;

        default:
            score = 6;
            break;
    }

    if (r == 'Y') {
        switch (l) {
            case 'A':
                score += 1;
                break;
            case 'B':
                score += 2;
                break;
            case 'C':
                score += 3;
                break;
        }
    } else if (r == 'X') {
        switch (l) {
            case 'A': // rock
                score += 3; // scissors
                break;
            case 'B': // paper
                score += 1; // rock
                break;
            case 'C': // scissors
                score += 2; // paper
                break;
        }
    } else if (r == 'Z') {
        switch (l) {
            case 'A': // rock
                score += 2; // paper
                break;
            case 'B': // paper
                score += 3; // scissors
                break;
            case 'C': // scissors
                score += 1; // rock
                break;
        }
    }

    return score;
}

const start = Date.now();

let totalScore = 0;
let totalScore2 = 0;

for (const line of input.split('\n')) {
    const what = line.trim().split(' ');
    const score = getScore(what[0], what[1]);
    totalScore += score;

    totalScore2 += getScore2(what[0], what[1]);
}

console.log(`Total score : ${totalScore}`);
console.log(`Total score 2 : ${totalScore2}`);

console.log(`took ${Date.now() - start}ms`);
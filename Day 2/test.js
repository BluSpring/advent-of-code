const testString = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
const regex = /Game (\d+): (?:(?:\s)?(\d+ (?:red|green|blue))(?:;|,)?)+/;

console.log(testString.match(regex));
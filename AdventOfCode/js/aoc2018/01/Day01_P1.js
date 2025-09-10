const {readLines} = require('./../../input')

const input = readLines().map(n=>Number.parseInt(n))
const solution = input.reduce((acc, curr)=>acc+=curr, 0)
console.log(solution)
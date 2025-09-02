const {readLines} = require('./input')

const input = readLines().map(n=>Number.parseInt(n))
let result = input.reduce((acc, curr)=>acc+=Math.floor(curr/3)-2, 0)
console.log(result)
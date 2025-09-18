const { readLines } = require('../../input')
let input = readLines().sort((a, b) => a - b)
let differences = { 1: 0, 2: 0, 3: 1 }
for (let i = 0; i < input.length - 1; i++) {
    let diff = input[i + 1] - input[i]
    differences[diff]++
}
differences[input[0]]++ // This assumes your input lowest number is 1. Change accordingly.
console.log(differences[1] * differences[3])
const { readInput } = require('../../input')
let input = readInput().split(',').map(n => Number.parseInt(n)).sort((a, b) => a - b)
let costs = {}
for (let i = input[0]; i <= input[input.length - 1]; i++) {
    costs[i] = input.reduce((acc, curr) => acc += Math.abs(curr - i), 0)
}
let sol = Object.values(costs).reduce((acc, curr) => acc = Math.min(acc, curr))
console.log(sol)
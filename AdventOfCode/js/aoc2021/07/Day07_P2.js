const { readInput } = require('../../input')
let input = readInput().split(',').map(n => Number.parseInt(n)).sort((a, b) => a - b)
let cache = {}
let costs = {}

for (let i = input[0]; i <= input[input.length - 1]; i++) {
    let acc = 0
    input.forEach(n => {
        acc += calculateDistance(Math.abs(n - i))
    })
    costs[i] = acc
}
let sol = Object.values(costs).reduce((acc, curr) => acc = Math.min(acc, curr))
console.log(sol)


function calculateDistance(n) {
    if (cache[n] !== null && cache[n] !== undefined) {
        return cache[n]
    } else {
        let value = n > 0 ? calculateDistance(n - 1) + n : 0
        cache[n] = value
        return value
    }
}









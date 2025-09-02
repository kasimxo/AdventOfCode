const {readLines} = require('./input')
// 5115309 too low

let input = readLines().map(n=>Number.parseInt(n))
let result = input.reduce((acc, curr)=>acc+=CalculateFuel(curr), 0)
console.log(result)

function CalculateFuel(amount){
    let fuel = Math.floor(amount/3)-2
    return fuel > 0 ? fuel+=CalculateFuel(fuel) : 0
}
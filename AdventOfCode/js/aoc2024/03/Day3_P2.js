const { readLines, readInput } = require('./../../input')

let text = readInput()
/*
text = [
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
]
*/
// 59140341 too high
// 59140000 too high
// 56275602
// 55256196 too low
let solution = 0

let expression = /mul\([0-9]{1,3},[0-9]{1,3}\)/g
let expressionNums = /[0-9]{1,3}/g

let parts = text.split("don't()")
console.log(parts[0])
let cleanParts = [parts[0]]
parts.forEach((part) => {
    let index = part.indexOf('do()')
    if (index >= 0) {
        cleanParts.push(part.substring(index))
    }
})
let matches = []
cleanParts.forEach((part) => {
    let matchesInLine = [...part.matchAll(expression)]
    matchesInLine.forEach((match) => matches.push(match))
})

matches.forEach((match) => {
    let nums = [...match[0].matchAll(expressionNums)]
    solution += Number.parseInt(nums[0]) * Number.parseInt(nums[1])
})
console.log('Solución: ', solution)
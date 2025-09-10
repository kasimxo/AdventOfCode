const { readLines } = require('./../../input')

let text = readLines()

text = [
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
]


let solution = 0

let expression = /mul\([0-9]{1,3},[0-9]{1,3}\)/g
let expressionNums = /[0-9]{1,3}/g
let expressionDo = /do\(\)/g
let expressionDont = /don't\(\)/g
let matches = []
let matchesDo = []
let matchesDont = []
let matchesMixed = []

text.forEach((line) => {
    let matchesInLine = [...line.matchAll(expression)]
    matchesInLine.forEach((match) => matches.push(match))
    let matchesInLineDo = [...line.matchAll(expressionDo)]
    matchesInLineDo.forEach((match) => matchesDo.push(match))
    matchesInLineDo.forEach((match) => matchesMixed.push(match))
    let matchesInLineDont = [...line.matchAll(expressionDont)]
    matchesInLineDont.forEach((match) => matchesDont.push(match))
    matchesInLineDo.forEach((match) => matchesMixed.push(match))
})

console.log(matchesMixed)
/*
matches.forEach((match) => {
    console.log(match.index)
    let nums = [...match[0].matchAll(expressionNums)]
    solution += Number.parseInt(nums[0]) * Number.parseInt(nums[1])
})
*/
console.log('Solución: ', solution)
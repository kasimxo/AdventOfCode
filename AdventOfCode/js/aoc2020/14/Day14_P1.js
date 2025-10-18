const { readLines } = require('../../input')
const MASK_LEGNTH = 36
let input = readLines()
let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
let memory = {}
input.forEach(line => {
    let groups = line.split(' ')
    if (groups[0].localeCompare('mask') === 0) {
        mask = groups[2]
    } else {
        let value = Number.parseInt(groups[2])
        let memAddress = groups[0].match(/^mem\[([0-9]*)\]/)[1]
        WriteInMemoryAddress(memAddress, value)
    }
})
let sol = Object.values(memory).reduce((acc, curr) => acc += curr)
console.log(sol)

function WriteInMemoryAddress(memAddress, value) {
    let baseTwo = value.toString(2)
    baseTwo = '0'.repeat(MASK_LEGNTH - baseTwo.length) + baseTwo
    let calculatedValue = ''
    for (let i = 0; i < MASK_LEGNTH; i++) {
        calculatedValue += mask[i] !== 'X' ? mask[i] : baseTwo[i]
    }
    memory[memAddress] = Number.parseInt(calculatedValue, 2)
}
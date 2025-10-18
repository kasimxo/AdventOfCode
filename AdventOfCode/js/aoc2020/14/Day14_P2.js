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
        let memAddress = Number.parseInt(groups[0].match(/^mem\[([0-9]*)\]/)[1])
        WriteInMemoryAddress(memAddress, value)
    }
})
let sol = Object.values(memory).reduce((acc, curr) => acc += curr)
console.log(sol)

function WriteInMemoryAddress(memAddress, value) {
    let baseTwoAddress = memAddress.toString(2)
    baseTwoAddress = '0'.repeat(MASK_LEGNTH - baseTwoAddress.length) + baseTwoAddress
    let applied = ''
    let indexes = []
    for (let i = 0; i < MASK_LEGNTH; i++) {
        if (mask[i] === '0') {
            applied += baseTwoAddress[i]
        } else if (mask[i] === 'X') {
            applied += 'X'
            indexes.push(i)
        } else if (mask[i] === '1') {
            applied += '1'
        }
    }

    /**
     * At this point we have the memAddress calculated with Xs
     * Every single X can either take a 0 or a 1
     * We have to take every single combination possible
     * 
     * Example:
     * 000000000000000000000000000000X1101X
     * 
     * If we store X's indexes some where: (which we did while iterating the string)
     * indexes = [30, 35]
     * 
     * Now we can play with a string with length equal to the amount of Xs
     * XX
     * 
     * And then take every combination in that space, which is the same as counting
     * from 0 to 11 (binary) -> from 0 to 3 (in decimal)
     * 
     * At every step we replace the binary in the mask:
     * Binary count         Mask value
     * 00                   000000000000000000000000000000011010
     * 01                   000000000000000000000000000000011011
     * 10                   000000000000000000000000000000111010
     * 11                   000000000000000000000000000000111011
     * 
     * We can also write to memory at the same time, 
     * no need to store every calculated memory address
     */

    const COMBINATIONS = Math.pow(2, indexes.length)
    for (let i = 0; i < COMBINATIONS; i++) {
        let comb = i.toString(2)
        comb = '0'.repeat(indexes.length - comb.length) + comb
        let targetAddress = '' + applied
        comb.split('').forEach((digit, index) => {
            targetAddress = targetAddress.substring(0, indexes[index]) + digit + targetAddress.substring(indexes[index] + 1)
        })
        let calculatedAddress = Number.parseInt(targetAddress, 2)
        memory[calculatedAddress] = value
    }
}
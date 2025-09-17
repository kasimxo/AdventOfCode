const { readLines } = require('../../input')
let input = readLines().map(n => Number.parseInt(n))
for (let i = 25; i < input.length; i++) {
    let possible = false
    let val = input[i]
    let lookingFor = new Set()
    for (let j = i - 25; j < i; j++) {
        let currVal = input[j]
        let missingPair = val - currVal
        if (lookingFor.has(missingPair)) {
            possible = true
            break
        } else {
            lookingFor.add(currVal)
        }
    }
    if (!possible) {
        console.log(val)
        break
    }
}
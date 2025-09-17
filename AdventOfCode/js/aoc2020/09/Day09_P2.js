const { readLines } = require('../../input')
let input = readLines().map(n => Number.parseInt(n))
let val = 0
let index = 0
for (let i = 25; i < input.length; i++) {
    let possible = false
    val = input[i]
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
        index = i
        break
    }
}
let combinations = []

for (let i = 0; i < index; i++) {
    let currVal = input[i]
    let solved = false
    let newCombinations = []

    combinations.forEach(c => {
        let [missing, min, max] = c
        if (missing < currVal) {
            // We loose this combo, it is no longer possible
        } else if (missing === currVal) {
            // jackpot
            let newC = [missing - currVal, Math.min(min, currVal), Math.max(max, currVal)]
            console.log(newC, newC.reduce((acc, curr) => acc += curr))
            solved = true
            return
        } else {
            let newC = [missing - currVal, Math.min(min, currVal), Math.max(max, currVal)]
            newCombinations.push(newC)
        }
    })
    if (solved) break
    combinations = newCombinations
    // [ missing, min, max ]
    combinations.push([val - currVal, currVal, currVal])
}
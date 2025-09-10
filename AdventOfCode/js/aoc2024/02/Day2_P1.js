const { readLines } = require('./../../input')

let text = readLines();
// Solución > 400
// Solución < 797
/*
text = [
    '7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9'
]
*/
let count = 0

text.forEach((line) => count += isLineSafe(line))

console.log('Solucion: ', count)

function isLineSafe(line) {
    let split = line.split(' ')
    let increasing = split.toSorted((a, b) => a - b)
    let decreasing = split.toSorted((a, b) => b - a)
    let isIncreasing = true
    let isDecreasing = true
    let together = true
    for (let i = 0; i < split.length - 1; i++) {
        let numA = Number.parseInt(split[i])
        let numB = Number.parseInt(split[i + 1])

        if (numA !== Number.parseInt(increasing[i])) {
            isIncreasing = false
        }

        if (numA !== Number.parseInt(decreasing[i])) {
            isDecreasing = false
        }

        if (Math.abs(numA - numB) < 1 || Math.abs(numA - numB) > 3) {
            together = false
        }
    }
    console.log((isIncreasing || isDecreasing) && together)
    return (isIncreasing || isDecreasing) && together
}

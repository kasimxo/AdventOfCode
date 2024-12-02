const { readLines } = require('./input')

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
]*/

let count = 0

text.forEach((line) => count += recursiveIsLineSafe(line))

console.log('Solucion: ', count)

function recursiveIsLineSafe(line) {
    let isSafe = 0
    let split = line.split(' ')
    for (let i = 0; i < split.length; i++) {

        let newCopy = []
        split.forEach((num, index) => {
            if (index !== i) {
                newCopy.push(Number.parseInt(num))
            }
        })
        //console.log(newCopy)
        isSafe += isLineSafe(newCopy)
    }

    return isSafe > 0
}



function isLineSafe(lineArr) {

    let increasing = lineArr.toSorted((a, b) => a - b)
    let decreasing = lineArr.toSorted((a, b) => b - a)
    let isIncreasing = true
    let isDecreasing = true
    let together = true
    for (let i = 0; i < lineArr.length - 1; i++) {
        let numA = Number.parseInt(lineArr[i])
        let numB = Number.parseInt(lineArr[i + 1])

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
    //console.log((isIncreasing || isDecreasing) && together)
    return (isIncreasing || isDecreasing) && together
}

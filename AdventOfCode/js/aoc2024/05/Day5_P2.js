const { readLines } = require('./../../input')

text = readLines()
let specifications = []

let count = 0

text.forEach((line) => {
    if (line.indexOf('|') >= 0) {
        specifications.push(extractNorm(line))
    } else {
        let splitted = line.split(',')
        let numbers = []
        splitted.forEach((num) => numbers.push(Number.parseInt(num)))
        if (numbers.length > 1 && !validateLine(numbers, specifications)) {
            let orderedNumbers = orderNumbers(numbers, specifications)
            count += returnMiddle(orderedNumbers)
        }
    }
})

console.log('Solucion: ', count)

function orderNumbers(nums, norms) {
    let ordered = []
    nums.forEach((num) => ordered.push(num + 0))
    let relevant = norms.filter((norm) => nums.indexOf(norm.before) >= 0 && nums.indexOf(norm.after) >= 0)
    while (!validateLine(ordered, relevant)) {
        relevant.forEach((norm) => {
            let iB = ordered.indexOf(norm.before)
            let iA = ordered.indexOf(norm.after)
            if (iA < iB && iB >= 0 && iA >= 0) {
                let aux = ordered[iA]
                ordered[iA] = ordered[iB]
                ordered[iB] = aux
            }
        })
    }
    return ordered
}


function validateLine(numbers, norms) {
    let output = true
    norms.forEach((norm) => {
        let iB = numbers.indexOf(norm.before)
        let iA = numbers.indexOf(norm.after)
        if (output && iA < iB && iB >= 0 && iA >= 0) {
            output = false
        }
    })
    return output
}

function extractNorm(line) {
    let splitted = line.split('|')
    let specificationObj = {
        before: Number.parseInt(splitted[0]),
        after: Number.parseInt(splitted[1])
    }
    return specificationObj
}

function returnMiddle(numbers) {
    let num = numbers[Math.floor(numbers.length / 2)]
    return num
}
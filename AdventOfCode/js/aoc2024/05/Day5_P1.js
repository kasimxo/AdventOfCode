const { readLines } = require('./input')

let text = [
    '47|53',
    '97|13',
    '97|61',
    '97|47',
    '75|29',
    '61|13',
    '75|53',
    '29|13',
    '97|29',
    '53|29',
    '61|53',
    '97|53',
    '61|29',
    '47|13',
    '75|47',
    '97|75',
    '47|61',
    '75|61',
    '47|29',
    '75|13',
    '53|13',
    '',
    '75,47,61,53,29',
    '97,61,53,29,13',
    '75,29,13',
    '75,97,47,61,53',
    '61,13,29',
    '97,13,75,29,47'
]
//text = readLines()
let specifications = []

let count = 0

// Función validadora de páginas
//Introduces las páginas: 61,13,29 y comprueba si cumplen las características

//Función que sume página del medio

//Función que extrae las especificaciones

text.forEach((line) => {
    if (line.indexOf('|') >= 0) {
        specifications.push(extractNorm(line))
    } else {
        let splitted = line.split(',')
        let numbers = []
        splitted.forEach((num) => numbers.push(Number.parseInt(num)))
        if (numbers.length > 1 && validateLine(numbers, specifications)) {
            count += returnMiddle(numbers)
        }
    }
})


console.log('Solucion: ', count)

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